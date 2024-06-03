import { App } from '../../core/app';
import { ErrorHandler } from '../../core/errorHandler';

describe('App Error Handling', () => {
    let app: App;
    let mockRequest: any;
    let mockResponse: any;

    beforeEach(() => {
        app = new App();
        mockRequest = {} as any;
        mockResponse = {
            statusCode: 0,
            end: jest.fn(),
        } as any;
    });

    it('should use custom error handler', () => {
        const customErrorHandler = new ErrorHandler();
        customErrorHandler.setErrorHandler((err, req, res) => {
            res.statusCode = 400;
            res.end('Custom Error');
        });

        app.setErrorHandler(customErrorHandler.handleError.bind(customErrorHandler));

        app['errorHandler'].handleError(new Error('Test Error'), mockRequest, mockResponse);

        expect(mockResponse.statusCode).toBe(400);
        expect(mockResponse.end).toHaveBeenCalledWith('Custom Error');
    });
});
