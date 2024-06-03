"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareManager = void 0;
class MiddlewareManager {
    constructor() {
        this.middlewares = [];
    }
    use(middleware) {
        this.middlewares.push(middleware);
    }
    executeMiddlewares(req, res, middlewares, callback) {
        const stack = middlewares.concat(this.middlewares);
        const next = (err) => {
            if (err) {
                callback(err);
                return;
            }
            const middleware = stack.shift();
            if (middleware) {
                middleware(req, res, next);
            }
            else {
                callback();
            }
        };
        next();
    }
}
exports.MiddlewareManager = MiddlewareManager;
