import * as http from 'http';
import { MiddlewareManager, Middleware } from './middleware';

interface Route {
    method: string;
    path: string;
    handler: (req: http.IncomingMessage, res: http.ServerResponse) => void;
    middlewares?: Middleware[];
}

export class Router {
    private routes: Route[] = [];
    private middlewareManager: MiddlewareManager;
    private controllers: any[] = [];

    constructor(middlewareManager: MiddlewareManager) {
        this.middlewareManager = middlewareManager;
    }

    registerController(controller: any) {
        this.controllers.push(controller);
        const prefix = Reflect.getMetadata('prefix', controller.constructor) || '';
        const routes = Reflect.getMetadata('routes', controller.constructor) || [];

        routes.forEach((route: any) => {
            const fullPath = prefix + route.path;
            this.routes.push({
                ...route,
                path: fullPath,
                handler: controller[route.handlerName].bind(controller)
            });
        });
    }

    getControllers() {
        return this.controllers;
    }

    handle(req: http.IncomingMessage, res: http.ServerResponse, errorHandler: (err: any, req: http.IncomingMessage, res: http.ServerResponse) => void) {
        const { method, url } = req;
        const route = this.routes.find(r => r.method === method?.toLowerCase() && r.path === url);

        if (route) {
            this.middlewareManager.executeMiddlewares(req, res, route.middlewares || [], (err?: any) => {
                if (err) {
                    errorHandler(err, req, res);
                } else {
                    try {
                        route.handler(req, res);
                    } catch (error) {
                        errorHandler(error, req, res);
                    }
                }
            });
        } else {
            res.statusCode = 404;
            res.end('Not Found');
        }
    }
}
