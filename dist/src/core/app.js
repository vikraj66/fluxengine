"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const server_1 = require("./server");
const router_1 = require("./router");
const middleware_1 = require("./middleware");
const errorHandler_1 = require("./errorHandler");
const logger_1 = require("./logger");
class App {
    constructor() {
        this.middlewareManager = new middleware_1.MiddlewareManager();
        this.router = new router_1.Router(this.middlewareManager);
        this.errorHandler = new errorHandler_1.ErrorHandler();
        this.logger = new logger_1.Logger();
        this.server = new server_1.Server(this.router, this.errorHandler, this.logger);
    }
    use(middleware) {
        this.middlewareManager.use(middleware);
    }
    setErrorHandler(handler) {
        this.errorHandler.setErrorHandler(handler);
    }
    registerController(controller) {
        this.router.registerController(controller);
    }
    listen(port, callback) {
        this.server.listen(port, callback);
    }
}
exports.App = App;
