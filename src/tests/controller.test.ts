import 'reflect-metadata';
import { Controller, Route } from '../core/controller';

describe('Controller Decorator', () => {
    it('should add prefix metadata to the controller', () => {
        @Controller('/test')
        class TestController {}

        const prefix = Reflect.getMetadata('prefix', TestController);
        expect(prefix).toBe('/test');
    });
});

describe('Route Decorator', () => {
    it('should add route metadata to the controller', () => {
        class TestController {
            @Route('get', '/test')
            testMethod() {}
        }

        const routes = Reflect.getMetadata('routes', TestController);
        expect(routes.length).toBe(1);
        expect(routes[0].path).toBe('/test');
    });
});
