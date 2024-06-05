"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../core/app");
describe('App', () => {
    let app;
    beforeEach(() => {
        app = new app_1.App();
    });
    it('should create an instance', () => {
        expect(app).toBeTruthy();
    });
});
