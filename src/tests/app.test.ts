import { App } from '../core/app';

describe('App', () => {
    let app: App;

    beforeEach(() => {
        app = new App();
    });

    it('should create an instance', () => {
        expect(app).toBeTruthy();
    });
});
