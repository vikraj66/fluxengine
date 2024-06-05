"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("../core/errorHandler");
describe('ErrorHandler', () => {
    let errorHandler;
    let mockRequest;
    let mockResponse;
    beforeEach(() => {
        errorHandler = new errorHandler_1.ErrorHandler();
        mockRequest = {};
        mockResponse = {
            statusCode: 0,
            end: jest.fn(),
        };
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
