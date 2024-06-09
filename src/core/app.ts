import { Server } from './server';
import { Router } from './router';
import { MiddlewareManager, Middleware } from './middleware';
import { ErrorHandler } from './errorHandler';
import { Logger } from './logger';
import * as http from 'http';

interface AppOptions {
    middlewareManager?: MiddlewareManager;
    router?: Router;
    errorHandler?: ErrorHandler;
    logger?: Logger;
}

export class App {
    private _server: Server;
    private router: Router;
    private middlewareManager: MiddlewareManager;
    private errorHandler: ErrorHandler;
    private logger: Logger;

    constructor(options: AppOptions = {}) {
        this.middlewareManager = options.middlewareManager || new MiddlewareManager();
        this.router = options.router || new Router(this.middlewareManager);
        this.errorHandler = options.errorHandler || new ErrorHandler();
        this.logger = options.logger || new Logger();
        this._server = new Server(this.router, this.errorHandler, this.logger);
    }

    use(middleware: Middleware) {
        this.middlewareManager.use(middleware);
    }

    setErrorHandler(handler: (err: any, req: http.IncomingMessage, res: http.ServerResponse) => void) {
        this.errorHandler.setErrorHandler(handler);
    }

    registerController(controller: any) {
        this.router.registerController(controller);
    }

    listen(port: number, callback: () => void) {
        console.log("server started at port 3000")
        this._server.listen(port, callback);
    }

    close(callback?: (err?: Error) => void) {
        this._server.close(callback);
    }

    // Getter for server
    get server(): Server {
        return this._server;
    }

    // Setter for server
    set server(server: Server) {
        this._server = server;
    }

    // Method to set a custom request handler with CORS enabled
    setRequestHandler(handler: (req: http.IncomingMessage, res: http.ServerResponse) => void) {
        this._server.setRequestHandler(handler);
    }
}
