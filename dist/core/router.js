"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
class Router {
    constructor(middlewareManager) {
        this.routes = [];
        this.middlewareManager = middlewareManager;
    }
    registerController(controller) {
        const prefix = Reflect.getMetadata('prefix', controller.constructor) || '';
        const routes = Reflect.getMetadata('routes', controller.constructor) || [];
        routes.forEach((route) => {
            const fullPath = prefix + route.path;
            this.routes.push(Object.assign(Object.assign({}, route), { fullPath, handler: controller[route.handlerName].bind(controller) }));
        });
    }
    handle(req, res, errorHandler) {
        const { method, url } = req;
        const route = this.routes.find(r => r.method === (method === null || method === void 0 ? void 0 : method.toLowerCase()) && r.path === url);
        if (route) {
            this.middlewareManager.executeMiddlewares(req, res, route.middlewares || [], (err) => {
                if (err) {
                    errorHandler(err, req, res);
                }
                else {
                    route.handler(req, res);
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
