"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../core/router");
const middleware_1 = require("../core/middleware");
const errorHandler_1 = require("../core/errorHandler");
const http = __importStar(require("http"));
describe('Router', () => {
    let router;
    let middlewareManager;
    let errorHandler;
    let mockRequest;
    let mockResponse;
    beforeEach(() => {
        middlewareManager = new middleware_1.MiddlewareManager();
        router = new router_1.Router(middlewareManager);
        errorHandler = new errorHandler_1.ErrorHandler();
        mockRequest = {};
        mockResponse = {
            statusCode: 0,
            end: jest.fn(),
        };
    });
    it('should handle requests with registered routes', () => {
        class TestController {
            testMethod(req, res) {
                res.statusCode = 200;
                res.end('Test');
            }
        }
        __decorate([
            Reflect.metadata('routes', [
                { method: 'get', path: '/test', handlerName: 'testMethod' }
            ]),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [http.IncomingMessage, http.ServerResponse]),
            __metadata("design:returntype", void 0)
        ], TestController.prototype, "testMethod", null);
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
