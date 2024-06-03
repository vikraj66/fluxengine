import * as http from 'http';

export class ErrorHandler {
    private handler: (err: any, req: http.IncomingMessage, res: http.ServerResponse) => void | Promise<void>;

    constructor() {
        this.handler = (err, req, res) => {
            console.error(err);  // Ensure the error is logged
            res.statusCode = 500;
            res.end('Internal Server Error');
        };
    }

    setErrorHandler(handler: (err: any, req: http.IncomingMessage, res: http.ServerResponse) => void | Promise<void>) {
        this.handler = handler;
    }

    async handleError(err: any, req: http.IncomingMessage, res: http.ServerResponse) {
        try {
            await this.handler(err, req, res);
        } catch (error) {
            console.error(error);  // Ensure the error is logged
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
    }
}
