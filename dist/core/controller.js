"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = exports.Controller = void 0;
require("reflect-metadata");
function Controller(prefix) {
    return target => {
        Reflect.defineMetadata('prefix', prefix, target);
        if (!Reflect.hasMetadata('routes', target)) {
            Reflect.defineMetadata('routes', [], target);
        }
    };
}
exports.Controller = Controller;
function Route(method, path, event, middlewares = []) {
    return (target, propertyKey, descriptor) => {
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }
        const routes = Reflect.getMetadata('routes', target.constructor);
        routes.push({
            method,
            path,
            handlerName: propertyKey,
            event,
            middlewares
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    };
}
exports.Route = Route;
