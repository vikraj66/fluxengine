"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const comment_repository_1 = require("../repositories/comment.repository");
const rxjs_1 = require("rxjs");
class CommentService {
    constructor() {
        this.commentRepo = new comment_repository_1.CommentRepository();
    }
    getComments() {
        return (0, rxjs_1.from)(this.commentRepo.findAll());
    }
    createComment(comment) {
        return (0, rxjs_1.from)(this.commentRepo.create(comment));
    }
}
exports.CommentService = CommentService;
