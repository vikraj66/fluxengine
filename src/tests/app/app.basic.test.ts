import 'reflect-metadata';  // Ensure this import is present
import { App } from '../../core/app';
import { Logger } from '../../core/logger';
import { MiddlewareManager } from '../../core/middleware';
import { Router } from '../../core/router';
import { ErrorHandler } from '../../core/errorHandler';

describe('App Basic Functionality', () => {
    let app: App;

    beforeEach(() => {
        app = new App({
            logger: new Logger(),
            middlewareManager: new MiddlewareManager(),
            router: new Router(new MiddlewareManager()),
            errorHandler: new ErrorHandler(),
        });
    });

    it('should create an instance', () => {
        expect(app).toBeTruthy();
    });

    it('should allow adding middleware', () => {
        const middleware = jest.fn();
        app.use(middleware);
        expect(app['middlewareManager']['middlewares']).toContain(middleware);
    });

    it('should allow setting error handler', () => {
        const errorHandler = jest.fn();
        app.setErrorHandler(errorHandler);
        expect(app['errorHandler']['handler']).toBe(errorHandler);
    });

    it('should allow registering controllers', () => {
        class TestController {
            static prefix = '/test';
            static routes = [
                { method: 'get', path: '/route', handlerName: 'testMethod' }
            ];

            testMethod() {}
        }

        app.registerController(new TestController());
        expect(app['router']['controllers']).toContainEqual(new TestController());
    });
});
