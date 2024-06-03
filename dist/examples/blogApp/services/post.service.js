"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const post_repository_1 = require("../repositories/post.repository");
const rxjs_1 = require("rxjs");
class PostService {
    constructor() {
        this.postRepo = new post_repository_1.PostRepository();
    }
    getPosts() {
        return (0, rxjs_1.from)(this.postRepo.findAll());
    }
    createPost(post) {
        return (0, rxjs_1.from)(this.postRepo.create(post));
    }
}
exports.PostService = PostService;
