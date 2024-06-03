import { ErrorHandler } from '../core/errorHandler';
import * as http from 'http';

describe('ErrorHandler', () => {
    let errorHandler: ErrorHandler;
    let mockRequest: http.IncomingMessage;
    let mockResponse: http.ServerResponse;

    beforeEach(() => {
        errorHandler = new ErrorHandler();
        mockRequest = {} as http.IncomingMessage;
        mockResponse = {
            statusCode: 0,
            end: jest.fn(),
        } as unknown as http.ServerResponse;
    });

    it('should handle errors with default handler', () => {
        const error = new Error('Test error');
        errorHandler.handleError(error, mockRequest, mockResponse);

        expect(mockResponse.statusCode).toBe(500);
        expect(mockResponse.end).toHaveBeenCalledWith('Internal Server Error');
    });

    it('should handle errors with custom handler', () => {
        const customHandler = jest.fn();
        errorHandler.setErrorHandler(customHandler);

        const error = new Error('Test error');
        errorHandler.handleError(error, mockRequest, mockResponse);

        expect(customHandler).toHaveBeenCalledWith(error, mockRequest, mockResponse);
    });
});
