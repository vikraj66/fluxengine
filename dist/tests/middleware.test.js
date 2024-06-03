"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("../core/middleware");
describe('MiddlewareManager', () => {
    let middlewareManager;
    let mockRequest;
    let mockResponse;
    let nextFunction;
    beforeEach(() => {
        middlewareManager = new middleware_1.MiddlewareManager();
        mockRequest = {};
        mockResponse = {
            statusCode: 0,
            end: jest.fn(),
        };
        nextFunction = jest.fn();
    });
    it('should execute middlewares in order', () => {
        const middleware1 = jest.fn((req, res, next) => next());
        const middleware2 = jest.fn((req, res, next) => next());
        middlewareManager.use(middleware1);
        middlewareManager.use(middleware2);
        middlewareManager.executeMiddlewares(mockRequest, mockResponse, [], nextFunction);
        expect(middleware1).toHaveBeenCalled();
        expect(middleware2).toHaveBeenCalled();
        expect(nextFunction).toHaveBeenCalled();
    });
});
