import { MiddlewareManager, Middleware } from '../../core/middleware';
import * as http from 'http';

describe('Middleware Execution', () => {
    let middlewareManager: MiddlewareManager;
    let mockRequest: http.IncomingMessage;
    let mockResponse: http.ServerResponse;
    let nextFunction: jest.Mock;

    beforeEach(() => {
        middlewareManager = new MiddlewareManager();
        mockRequest = {} as http.IncomingMessage;
        mockResponse = {
            statusCode: 0,
            end: jest.fn(),
        } as unknown as http.ServerResponse;
        nextFunction = jest.fn();
    });

    it('should execute middleware in order', () => {
        const middleware1 = jest.fn((req, res, next) => next());
        const middleware2 = jest.fn((req, res, next) => next());

        middlewareManager.use(middleware1);
        middlewareManager.use(middleware2);

        middlewareManager.executeMiddlewares(mockRequest, mockResponse, [], nextFunction);

        expect(middleware1).toHaveBeenCalled();
        expect(middleware2).toHaveBeenCalled();
        expect(nextFunction).toHaveBeenCalled();
    });

    it('should handle errors in middleware and stop execution', () => {
        const error = new Error('Test Error');
        const middleware1 = jest.fn((req, res, next) => next(error));
        const middleware2 = jest.fn();

        middlewareManager.use(middleware1);
        middlewareManager.use(middleware2);

        middlewareManager.executeMiddlewares(mockRequest, mockResponse, [], nextFunction);

        expect(middleware1).toHaveBeenCalled();
        expect(middleware2).not.toHaveBeenCalled();
        expect(nextFunction).toHaveBeenCalledWith(error);
    });

    it('should execute additional middleware specific to route', () => {
        const routeMiddleware = jest.fn((req, res, next) => next());
        const globalMiddleware = jest.fn((req, res, next) => next());

        middlewareManager.use(globalMiddleware);

        middlewareManager.executeMiddlewares(mockRequest, mockResponse, [routeMiddleware], nextFunction);

        expect(globalMiddleware).toHaveBeenCalled();
        expect(routeMiddleware).toHaveBeenCalled();
        expect(nextFunction).toHaveBeenCalled();
    });
});
