import { IncomingMessage, ServerResponse } from 'http';

export class ErrorHandler {
    private handler: (err: any, req: IncomingMessage, res: ServerResponse) => void = (err, req, res) => {
        res.statusCode = 500;
        res.end('Internal Server Error');
    };

    setErrorHandler(handler: (err: any, req: IncomingMessage, res: ServerResponse) => void) {
        this.handler = handler;
    }

    handleError(err: any, req: IncomingMessage, res: ServerResponse) {
        this.handler(err, req, res);
    }
}
