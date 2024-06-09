import * as http from 'http';
import { Router } from './router';
import { ErrorHandler } from './errorHandler';
import { Logger } from './logger';

export class Server {
    private _server: http.Server;
    private router: Router;
    private errorHandler: ErrorHandler;
    private logger: Logger;
    private customHandler: ((req: http.IncomingMessage, res: http.ServerResponse, next: () => void) => void) | null = null;

    constructor(router: Router, errorHandler: ErrorHandler, logger: Logger) {
        this.router = router;
        this.errorHandler = errorHandler;
        this.logger = logger;
        this._server = http.createServer((req, res) => {
            this.logger.log(`${req.method} ${req.url}`);
            this.handleRequest(req, res);
        });
    }

    // Default request handler
    private handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
        if (this.customHandler) {
            this.customHandler(req, res, () => {
                this.router.handle(req, res, this.errorHandler.handleError.bind(this.errorHandler));
            });
        } else {
            this.router.handle(req, res, this.errorHandler.handleError.bind(this.errorHandler));
        }
    }

    // Method to set a custom request handler with CORS enabled
    setRequestHandler(handler: (req: http.IncomingMessage, res: http.ServerResponse, next: () => void) => void) {
        this.customHandler = (req, res, next) => {
            // Enable CORS
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

            if (req.method === 'OPTIONS') {
                res.writeHead(204);
                res.end();
                return;
            }

            // Call the provided handler
            handler(req, res, next);
        };
    }

    listen(port: number, callback: () => void) {
        this._server.listen(port, callback);
    }

    close(callback?: (err?: Error) => void) {
        this._server.close(callback);
    }

    // Getter for _server
    get server(): http.Server {
        return this._server;
    }

    // Setter for _server
    set server(server: http.Server) {
        this._server = server;
    }
}
