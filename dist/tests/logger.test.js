"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../core/logger");
describe('Logger', () => {
    let logger;
    beforeEach(() => {
        logger = new logger_1.Logger();
    });
    it('should log messages', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        logger.log('Test message');
        expect(consoleSpy).toHaveBeenCalledWith('Test message');
    });
});
