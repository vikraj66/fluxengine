"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const framework_1 = require("../../../src/framework");
const comment_service_1 = require("../services/comment.service");
// Define middleware
const logMiddleware = (req, res, next) => {
    framework_1.Logger.log(`${req.method} ${req.url}`);
    next();
};
let CommentController = (() => {
    let _classDecorators = [(0, framework_1.Controller)('/comments')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getAllComments_decorators;
    let _createComment_decorators;
    let _onCommentCreated_decorators;
    var CommentController = _classThis = class {
        constructor() {
            this.commentService = __runInitializers(this, _instanceExtraInitializers);
            this.commentService = new comment_service_1.CommentService();
        }
        getAllComments(req, res) {
            this.commentService.getComments().subscribe(comments => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(comments));
            });
        }
        createComment(req, res) {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const newComment = JSON.parse(body);
                this.commentService.createComment(newComment).subscribe(comment => {
                    framework_1.eventEmitter.next({ name: 'commentCreated', data: comment });
                    res.statusCode = 201;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(comment));
                });
            });
        }
        onCommentCreated(comment) {
            framework_1.Logger.log(`Comment created: ${JSON.stringify(comment)}`);
        }
    };
    __setFunctionName(_classThis, "CommentController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getAllComments_decorators = [(0, framework_1.Route)('get', '/', undefined, [logMiddleware])];
        _createComment_decorators = [(0, framework_1.Route)('post', '/', 'commentCreated', [logMiddleware])];
        _onCommentCreated_decorators = [(0, framework_1.Event)('commentCreated')];
        __esDecorate(_classThis, null, _getAllComments_decorators, { kind: "method", name: "getAllComments", static: false, private: false, access: { has: obj => "getAllComments" in obj, get: obj => obj.getAllComments }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createComment_decorators, { kind: "method", name: "createComment", static: false, private: false, access: { has: obj => "createComment" in obj, get: obj => obj.createComment }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _onCommentCreated_decorators, { kind: "method", name: "onCommentCreated", static: false, private: false, access: { has: obj => "onCommentCreated" in obj, get: obj => obj.onCommentCreated }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CommentController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CommentController = _classThis;
})();
exports.CommentController = CommentController;
