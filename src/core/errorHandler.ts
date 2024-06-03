import * as http from 'http';

export class ErrorHandler {
  private handler: (err: any, req: http.IncomingMessage, res: http.ServerResponse) => void = (err, req, res) => {
    res.statusCode = 500;
    res.end('Internal Server Error');
  };

  setErrorHandler(handler: (err: any, req: http.IncomingMessage, res: http.ServerResponse) => void) {
    this.handler = handler;
  }

  handleError(err: any, req: http.IncomingMessage, res: http.ServerResponse) {
    this.handler(err, req, res);
  }
}
