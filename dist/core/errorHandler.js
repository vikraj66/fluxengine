"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
class ErrorHandler {
    constructor() {
        this.handler = (err, req, res) => {
            res.statusCode = 500;
            res.end('Internal Server Error');
        };
    }
    setErrorHandler(handler) {
        this.handler = handler;
    }
    handleError(err, req, res) {
        this.handler(err, req, res);
    }
}
exports.ErrorHandler = ErrorHandler;
