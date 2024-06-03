"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareManager = void 0;
class MiddlewareManager {
    constructor() {
        this.globalMiddlewares = [];
    }
    use(middleware) {
        this.globalMiddlewares.push(middleware);
    }
    executeMiddlewares(req, res, middlewares, callback) {
        const stack = [...this.globalMiddlewares, ...middlewares];
        let index = 0;
        const next = (err) => {
            if (err) {
                return callback(err);
            }
            if (index < stack.length) {
                const middleware = stack[index];
                index++;
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
