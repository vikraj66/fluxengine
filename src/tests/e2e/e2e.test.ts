import 'reflect-metadata';
import { App } from '@/core/app';
import * as http from 'http';
import { UserController } from './setup/controllers/userController';
import { ProductController } from './setup/controllers/productController';
import { AuthMiddleware } from './setup/middleware/authMiddleware';
import { LoggingMiddleware } from './setup/middleware/loggingMiddleware';

describe('E2E Test Suite', () => {
    let app: App;
 
    beforeAll((done) => {
        app = new App();
        app.use(LoggingMiddleware);

        // Register controllers
        app.registerController(new UserController());
        app.registerController(new ProductController());

        app.listen(3000, done);
    });

    afterAll((done) => {
        app.close(done);
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

        req.on('error', done);  // Add error handler to catch request errors
        req.end();
    }, 10000);  // Increase timeout

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

        req.on('error', done);  // Add error handler to catch request errors
        req.end();
    }, 10000);  // Increase timeout

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

        req.on('error', done);  // Add error handler to catch request errors
        req.end();
    }, 10000);  // Increase timeout

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

        req.on('error', done);  // Add error handler to catch request errors
        req.end();
    }, 10000);  // Increase timeout

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

        req.on('error', done);  // Add error handler to catch request errors
        req.end();
    }, 10000);  // Increase timeout
});
