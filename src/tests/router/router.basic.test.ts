import 'reflect-metadata';
import { Router } from '../../core/router';
import { MiddlewareManager } from '../../core/middleware';
import { ErrorHandler } from '../../core/errorHandler';
import * as http from 'http';

describe('Router Basic Functionality', () => {
    let router: Router;
    let middlewareManager: MiddlewareManager;
    let errorHandler: ErrorHandler;
    let mockRequest: http.IncomingMessage;
    let mockResponse: http.ServerResponse;

    beforeEach(() => {
        middlewareManager = new MiddlewareManager();
        router = new Router(middlewareManager);
        errorHandler = new ErrorHandler();
        mockRequest = {} as http.IncomingMessage;
        mockResponse = {
            statusCode: 0,
            end: jest.fn(),
        } as unknown as http.ServerResponse;
    });

    it('should handle requests with registered routes', () => {
        @Reflect.metadata('routes', [
            { method: 'get', path: '/test', handlerName: 'testMethod' }
        ])
        class TestController {
            testMethod(req: http.IncomingMessage, res: http.ServerResponse) {
                res.statusCode = 200;
                res.end('Test');
            }
        }

        router.registerController(new TestController());

        mockRequest.method = 'GET';
        mockRequest.url = '/test';

        router.handle(mockRequest, mockResponse, errorHandler.handleError.bind(errorHandler));

        expect(mockResponse.statusCode).toBe(200);
        expect(mockResponse.end).toHaveBeenCalledWith('Test');
    });

    it('should return 404 for unregistered routes', () => {
        mockRequest.method = 'GET';
        mockRequest.url = '/notfound';

        router.handle(mockRequest, mockResponse, errorHandler.handleError.bind(errorHandler));

        expect(mockResponse.statusCode).toBe(404);
        expect(mockResponse.end).toHaveBeenCalledWith('Not Found');
    });
});
