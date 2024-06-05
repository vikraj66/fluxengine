import 'reflect-metadata';  // Ensure this import is present
import { ErrorHandler } from '../../../core/errorHandler';
import * as http from 'http';

describe('ErrorHandler Custom Functionality', () => {
    let errorHandler: ErrorHandler;
    let mockRequest: http.IncomingMessage;
    let mockResponse: http.ServerResponse;

    beforeEach(() => {
        errorHandler = new ErrorHandler();
        mockRequest = {} as http.IncomingMessage;
        mockResponse = {
            statusCode: 0,
            end: jest.fn(),
            setHeader: jest.fn(),
        } as unknown as http.ServerResponse;
    });

    it('should handle custom error and set specific status code', () => {
        class CustomError extends Error {
            statusCode: number;
            constructor(message: string, statusCode: number) {
                super(message);
                this.statusCode = statusCode;
            }
        }

        const customErrorHandler = (err: CustomError, req: http.IncomingMessage, res: http.ServerResponse) => {
            res.statusCode = err.statusCode || 500;
            res.end(err.message);
        };

        errorHandler.setErrorHandler(customErrorHandler);

        const error = new CustomError('Custom Error Message', 400);
        errorHandler.handleError(error, mockRequest, mockResponse);

        expect(mockResponse.statusCode).toBe(400);
        expect(mockResponse.end).toHaveBeenCalledWith('Custom Error Message');
    });

    it('should handle different error types', () => {
        const customErrorHandler = (err: any, req: http.IncomingMessage, res: http.ServerResponse) => {
            if (err instanceof TypeError) {
                res.statusCode = 400;
                res.end('Type Error');
            } else if (err instanceof SyntaxError) {
                res.statusCode = 500;
                res.end('Syntax Error');
            } else {
                res.statusCode = 500;
                res.end('Unknown Error');
            }
        };

        errorHandler.setErrorHandler(customErrorHandler);

        const typeError = new TypeError('Type Error');
        const syntaxError = new SyntaxError('Syntax Error');
        const genericError = new Error('Generic Error');

        errorHandler.handleError(typeError, mockRequest, mockResponse);
        expect(mockResponse.statusCode).toBe(400);
        expect(mockResponse.end).toHaveBeenCalledWith('Type Error');

        errorHandler.handleError(syntaxError, mockRequest, mockResponse);
        expect(mockResponse.statusCode).toBe(500);
        expect(mockResponse.end).toHaveBeenCalledWith('Syntax Error');

        errorHandler.handleError(genericError, mockRequest, mockResponse);
        expect(mockResponse.statusCode).toBe(500);
        expect(mockResponse.end).toHaveBeenCalledWith('Unknown Error');
    });

    it('should handle async errors', async () => {
        const customErrorHandler = async (err: any, req: http.IncomingMessage, res: http.ServerResponse) => {
            res.statusCode = 500;
            await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async operation
            res.end('Async Error');
        };

        errorHandler.setErrorHandler(customErrorHandler);

        const asyncError = new Error('Async Error');
        await errorHandler.handleError(asyncError, mockRequest, mockResponse);

        expect(mockResponse.statusCode).toBe(500);
        expect(mockResponse.end).toHaveBeenCalledWith('Async Error');
    });
});
