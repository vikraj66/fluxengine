import 'reflect-metadata';  // Ensure this import is present
import { Router } from '../../../core/router';
import { MiddlewareManager, Middleware } from '../../../core/middleware';
import { ErrorHandler } from '../../../core/errorHandler';
import * as http from 'http';

describe('Router with Middleware', () => {
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
            setHeader: jest.fn(),
            end: jest.fn(),
        } as unknown as http.ServerResponse;
    });

    it('should execute middleware before handling route', () => {
        const middleware: Middleware = (req, res, next) => {
            res.setHeader('X-Custom-Header', 'value');
            next();
        };

        middlewareManager.use(middleware);

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
        expect(mockResponse.setHeader).toHaveBeenCalledWith('X-Custom-Header', 'value');
        expect(mockResponse.end).toHaveBeenCalledWith('Test');
    });

    it('should handle errors thrown in middleware', () => {
        const middleware: Middleware = (req, res, next) => {
            next(new Error('Middleware Error'));
        };

        middlewareManager.use(middleware);

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

        expect(mockResponse.statusCode).toBe(500);
        expect(mockResponse.end).toHaveBeenCalledWith('Internal Server Error');
    });
});
