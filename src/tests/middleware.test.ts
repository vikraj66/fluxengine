import { MiddlewareManager } from '../core/middleware';
import * as http from 'http';

describe('MiddlewareManager', () => {
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
