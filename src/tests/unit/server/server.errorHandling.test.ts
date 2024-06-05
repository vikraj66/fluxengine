import 'reflect-metadata';
import { Server } from '../../../core/server';
import { Router } from '../../../core/router';
import { ErrorHandler } from '../../../core/errorHandler';
import { Logger } from '../../../core/logger';
import { MiddlewareManager } from '../../../core/middleware';
import * as http from 'http';

describe('Server Error Handling', () => {
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

    it('should handle errors and log them', (done) => {
        const logSpy = jest.spyOn(console, 'error');

        @Reflect.metadata('routes', [
            { method: 'get', path: '/test', handlerName: 'testMethod' }
        ])
        class TestController {
            testMethod(req: http.IncomingMessage, res: http.ServerResponse) {
                throw new Error('Test Error');
            }
        }

        router.registerController(new TestController());

        mockRequest.method = 'GET';
        mockRequest.url = '/test';

        server.listen(3000, () => {
            server['server'].emit('request', mockRequest, mockResponse);

            process.nextTick(() => {
                try {
                    expect(logSpy).toHaveBeenCalledWith(expect.any(Error));
                    expect(logSpy.mock.calls[0][0].message).toBe('Test Error');
                    expect(mockResponse.statusCode).toBe(500);
                    expect(mockResponse.end).toHaveBeenCalledWith('Internal Server Error');
                    done();
                } catch (error) {
                    done(error);
                }
            });
        });
    }, 15000); // Increase timeout to ensure the test completes
});
