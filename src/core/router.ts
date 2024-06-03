import * as http from 'http';
import 'reflect-metadata';
import { RouteDefinition } from '../types';
import { Middleware, MiddlewareManager } from './middleware';

export class Router {
    private routes: RouteDefinition[] = [];
    private middlewareManager: MiddlewareManager;

    constructor(middlewareManager: MiddlewareManager) {
        this.middlewareManager = middlewareManager;
    }

    registerController(controller: any) {
        const instance = new controller();
        const prefix = Reflect.getMetadata('prefix', controller);
        const routes = Reflect.getMetadata('routes', controller) as RouteDefinition[];

        routes.forEach(route => {
            const fullPath = prefix + route.path;
            this.routes.push({
                ...route,
                handler: instance[route.handlerName].bind(instance),
                fullPath,
                middlewares: route.middlewares || []
            });
        });
    }

    handle(req: http.IncomingMessage, res: http.ServerResponse, errorHandler: (err: any, req: http.IncomingMessage, res: http.ServerResponse) => void) {
        const { method, url } = req;
        const route = this.routes.find(r => r.method === method?.toLowerCase() && r.fullPath === url);

        if (route) {
            this.middlewareManager.executeMiddlewares(req, res, route.middlewares as Middleware[] || [], (err?: any) => {
                if (err) {
                    errorHandler(err, req, res);
                } else {
                    if (typeof route.handler === 'function') {
                        route.handler(req, res);
                    }
                }
            });
        } else {
            res.statusCode = 404;
            res.end('Not Found');
        }
    }
}
