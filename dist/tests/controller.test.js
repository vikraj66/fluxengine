"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const controller_1 = require("../core/controller");
describe('Controller Decorator', () => {
    it('should add prefix metadata to the controller', () => {
        let TestController = class TestController {
        };
        TestController = __decorate([
            (0, controller_1.Controller)('/test')
        ], TestController);
        const prefix = Reflect.getMetadata('prefix', TestController);
        expect(prefix).toBe('/test');
    });
});
describe('Route Decorator', () => {
    it('should add route metadata to the controller', () => {
        class TestController {
            testMethod() { }
        }
        __decorate([
            (0, controller_1.Route)('get', '/test'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], TestController.prototype, "testMethod", null);
        const routes = Reflect.getMetadata('routes', TestController);
        expect(routes.length).toBe(1);
        expect(routes[0].path).toBe('/test');
    });
});
