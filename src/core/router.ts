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

        const route = this.routes.find(r => this.matchRoute(r.path, url) && r.method === method?.toLowerCase());

        

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

    private matchRoute(routePath: string, url: string | undefined): boolean {
    if (!url) return false;

    // Ignore the query string and hash
    const pathname = url.split('?')[0].split('#')[0];

    // Ignore trailing slashes
    const routeParts = routePath.split('/').filter(part => part !== '');
    const urlParts = pathname.split('/').filter(part => part !== '');

    if (routeParts.length !== urlParts.length && !routeParts.some(part => part.endsWith('?'))) {
        return false;
    }

    const isMatch = routeParts.every((part, i) => {
        if (part.startsWith(':')) {
            return true;
        }

        if (part.endsWith('?')) {
            return i >= urlParts.length || part.slice(0, -1) === urlParts[i];
        }

        return part === urlParts[i];
    });

    return isMatch;
}
}
