"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../core/server");
const router_1 = require("../core/router");
const errorHandler_1 = require("../core/errorHandler");
const logger_1 = require("../core/logger");
const middleware_1 = require("../core/middleware");
describe('Server', () => {
    let server;
    let router;
    let errorHandler;
    let logger;
    let mockRequest;
    let mockResponse;
    beforeEach(() => {
        router = new router_1.Router(new middleware_1.MiddlewareManager());
        errorHandler = new errorHandler_1.ErrorHandler();
        logger = new logger_1.Logger();
        server = new server_1.Server(router, errorHandler, logger);
        mockRequest = {};
        mockResponse = {
            statusCode: 0,
            end: jest.fn(),
        };
    });
    it('should log requests and handle them', () => {
        const logSpy = jest.spyOn(logger, 'log');
        const handleSpy = jest.spyOn(router, 'handle');
        mockRequest.method = 'GET';
        mockRequest.url = '/test';
        server.listen(3000, () => {
            server['server'].emit('request', mockRequest, mockResponse);
            expect(logSpy).toHaveBeenCalledWith('GET /test');
            expect(handleSpy).toHaveBeenCalledWith(mockRequest, mockResponse, expect.any(Function));
        });
    });
});
