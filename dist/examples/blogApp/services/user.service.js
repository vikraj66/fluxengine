"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("../repositories/user.repository");
const rxjs_1 = require("rxjs");
class UserService {
    constructor() {
        this.userRepo = new user_repository_1.UserRepository();
    }
    getUsers() {
        return (0, rxjs_1.from)(this.userRepo.findAll());
    }
    createUser(user) {
        return (0, rxjs_1.from)(this.userRepo.create(user));
    }
}
exports.UserService = UserService;
