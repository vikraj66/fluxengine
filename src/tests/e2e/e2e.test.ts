import 'reflect-metadata';
import { Server } from '@/core/server';
import { Router } from '@/core/router';
import { ErrorHandler } from '@/core/errorHandler';
import { Logger } from '@/core/logger';
import { MiddlewareManager } from '@/core/middleware';
import * as http from 'http';
import { UserController } from './setup/controllers/userController';
import { ProductController } from './setup/controllers/productController';
import { AuthMiddleware } from './setup/middleware/authMiddleware';
import { LoggingMiddleware } from './setup/middleware/loggingMiddleware';

describe('E2E Test Suite', () => {
    let server: Server;
    let router: Router;
    let errorHandler: ErrorHandler;
    let logger: Logger;
    let middlewareManager: MiddlewareManager;

    beforeAll((done) => {
        middlewareManager = new MiddlewareManager();
        middlewareManager.use(LoggingMiddleware);
        router = new Router(middlewareManager);
        errorHandler = new ErrorHandler();
        logger = new Logger();
        server = new Server(router, errorHandler, logger);

        // Register controllers
        router.registerController(new UserController());
        router.registerController(new ProductController());

        // Register middleware for specific routes
        router.registerMiddleware('/users', AuthMiddleware);

        server.listen(3000, done);
    });

    afterAll((done) => {
        server['server'].close(done);
    });

    it('should get all users with valid token', (done) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/users',
            method: 'GET',
            headers: {
                'Authorization': 'valid-token'
            }
        };

        const req = http.request(options, (res) => {
            expect(res.statusCode).toBe(200);

            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                expect(JSON.parse(data)).toEqual([{ id: 1, name: 'John Doe' }]);
                done();
            });
        });

        req.end();
    });

    it('should get 401 Unauthorized without valid token', (done) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/users',
            method: 'GET',
        };

        const req = http.request(options, (res) => {
            expect(res.statusCode).toBe(401);
            done();
        });

        req.end();
    });

    it('should get user by ID', (done) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/users/1',
            method: 'GET',
            headers: {
                'Authorization': 'valid-token'
            }
        };

        const req = http.request(options, (res) => {
            expect(res.statusCode).toBe(200);

            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                expect(JSON.parse(data)).toEqual({ id: '1', name: 'John Doe' });
                done();
            });
        });

        req.end();
    });

    it('should get all products', (done) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/products',
            method: 'GET',
        };

        const req = http.request(options, (res) => {
            expect(res.statusCode).toBe(200);

            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                expect(JSON.parse(data)).toEqual([{ id: 1, name: 'Laptop' }]);
                done();
            });
        });

        req.end();
    });

    it('should get product by ID', (done) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/products/1',
            method: 'GET',
        };

        const req = http.request(options, (res) => {
            expect(res.statusCode).toBe(200);

            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                expect(JSON.parse(data)).toEqual({ id: '1', name: 'Laptop' });
                done();
            });
        });

        req.end();
    });
});
