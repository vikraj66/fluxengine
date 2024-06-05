import 'reflect-metadata';  // Ensure this import is present
import { Server } from '../../../core/server';
import { Router } from '../../../core/router';
import { ErrorHandler } from '../../../core/errorHandler';
import { Logger } from '../../../core/logger';
import { MiddlewareManager } from '../../../core/middleware';
import * as http from 'http';

describe('Server Basic Functionality', () => {
    let server: Server;
    let router: Router;
    let errorHandler: ErrorHandler;
    let logger: Logger;
    let mockRequest: http.IncomingMessage;
    let mockResponse: http.ServerResponse;

    beforeEach(() => {
        router = new Router(new MiddlewareManager());
        errorHandler = new ErrorHandler();
        logger = new Logger();
        server = new Server(router, errorHandler, logger);
        mockRequest = {} as http.IncomingMessage;
        mockResponse = {
            statusCode: 0,
            end: jest.fn(),
        } as unknown as http.ServerResponse;
    });

    afterEach(done => {
        server['server'].close(done);
    });

    it('should log requests and handle them', done => {
        const logSpy = jest.spyOn(logger, 'log');
        const handleSpy = jest.spyOn(router, 'handle');

        mockRequest.method = 'GET';
        mockRequest.url = '/test';

        server.listen(3000, () => {
            server['server'].emit('request', mockRequest, mockResponse);

            expect(logSpy).toHaveBeenCalledWith('GET /test');
            expect(handleSpy).toHaveBeenCalledWith(mockRequest, mockResponse, expect.any(Function));

            done();
        });
    });

    it('should handle requests with registered routes', done => {
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

        server.listen(3000, () => {
            server['server'].emit('request', mockRequest, mockResponse);

            expect(mockResponse.statusCode).toBe(200);
            expect(mockResponse.end).toHaveBeenCalledWith('Test');

            done();
        });
    });
});
