import { IncomingMessage, ServerResponse } from 'http';

export type Middleware = (req: IncomingMessage, res: ServerResponse, next: Function) => void;

export class MiddlewareManager {
  private globalMiddlewares: Middleware[] = [];

  use(middleware: Middleware) {
    this.globalMiddlewares.push(middleware);
  }

  executeMiddlewares(req: IncomingMessage, res: ServerResponse, middlewares: Middleware[], callback: Function) {
    const stack = [...this.globalMiddlewares, ...middlewares];
    let index = 0;

    const next = (err?: any) => {
      if (err) {
        return callback(err);
      }

      if (index < stack.length) {
        const middleware = stack[index];
        index++;
        middleware(req, res, next);
      } else {
        callback();
      }
    };

    next();
  }
}
