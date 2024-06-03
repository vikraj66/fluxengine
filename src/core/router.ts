import { IncomingMessage, ServerResponse } from 'http';
import { MiddlewareManager, Middleware } from './middleware';

interface Route {
    method: string;
    path: string;
    handler: (req: IncomingMessage, res: ServerResponse) => void;
    middlewares?: Middleware[];
}

export class Router {
    private routes: Route[] = [];
    private middlewareManager: MiddlewareManager;

    constructor(middlewareManager: MiddlewareManager) {
        this.middlewareManager = middlewareManager;
    }

    registerController(controller: any) {
        const prefix = Reflect.getMetadata('prefix', controller.constructor) || '';
        const routes = Reflect.getMetadata('routes', controller.constructor) || [];

        routes.forEach((route: any) => {
            const fullPath = prefix + route.path;
            this.routes.push({
                ...route,
                fullPath,
                handler: controller[route.handlerName].bind(controller)
            });
        });
    }

    handle(req: IncomingMessage, res: ServerResponse, errorHandler: (err: any, req: IncomingMessage, res: ServerResponse) => void) {
        const { method, url } = req;
        const route = this.routes.find(r => r.method === method?.toLowerCase() && r.path === url);

        if (route) {
            this.middlewareManager.executeMiddlewares(req, res, route.middlewares || [], (err?: any) => {
                if (err) {
                    errorHandler(err, req, res);
                } else {
                    route.handler(req, res);
                }
            });
        } else {
            res.statusCode = 404;
            res.end('Not Found');
        }
    }
}
