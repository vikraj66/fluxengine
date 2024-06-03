"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
require("reflect-metadata");
class Router {
    constructor(middlewareManager) {
        this.routes = [];
        this.middlewareManager = middlewareManager;
    }
    registerController(controller) {
        const instance = new controller();
        const prefix = Reflect.getMetadata('prefix', controller);
        const routes = Reflect.getMetadata('routes', controller);
        routes.forEach(route => {
            const fullPath = prefix + route.path;
            this.routes.push(Object.assign(Object.assign({}, route), { handler: instance[route.handlerName].bind(instance), fullPath, middlewares: route.middlewares || [] }));
        });
    }
    handle(req, res, errorHandler) {
        const { method, url } = req;
        const route = this.routes.find(r => r.method === (method === null || method === void 0 ? void 0 : method.toLowerCase()) && r.fullPath === url);
        if (route) {
            this.middlewareManager.executeMiddlewares(req, res, route.middlewares || [], (err) => {
                if (err) {
                    errorHandler(err, req, res);
                }
                else {
                    if (typeof route.handler === 'function') {
                        route.handler(req, res);
                    }
                }
            });
        }
        else {
            res.statusCode = 404;
            res.end('Not Found');
        }
    }
}
exports.Router = Router;
