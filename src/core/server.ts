import * as http from 'http';
import { Router } from './router';
import { ErrorHandler } from './errorHandler';
import { Logger } from './logger';

export class Server {
    private server: http.Server;
    private router: Router;
    private errorHandler: ErrorHandler;
    private logger: Logger;

    constructor(router: Router, errorHandler: ErrorHandler, logger: Logger) {
        this.router = router;
        this.errorHandler = errorHandler;
        this.logger = logger;
        this.server = http.createServer((req, res) => {
            this.logger.log(`${req.method} ${req.url}`);
            this.router.handle(req, res, this.errorHandler.handleError.bind(this.errorHandler));
        });
    }

    listen(port: number, callback: () => void) {
        this.server.listen(port, callback);
    }
}
