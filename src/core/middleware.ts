import { IncomingMessage, ServerResponse } from 'http';

export interface Middleware {
    (req: IncomingMessage, res: ServerResponse, next: (err?: any) => void): void;
}

export class MiddlewareManager {
    private middlewares: Middleware[] = [];

    use(middleware: Middleware) {
        this.middlewares.push(middleware);
    }

    executeMiddlewares(req: IncomingMessage, res: ServerResponse, middlewares: Middleware[], callback: (err?: any) => void) {
        const stack = middlewares.concat(this.middlewares);

        const next = (err?: any) => {
            if (err) {
                callback(err);
                return;
            }

            const middleware = stack.shift();
            if (middleware) {
                middleware(req, res, next);
            } else {
                callback();
            }
        };

        next();
    }
}
