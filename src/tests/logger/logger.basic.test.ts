import { Logger } from '../../core/logger';

describe('Logger Basic Functionality', () => {
    let logger: Logger;

    beforeEach(() => {
        logger = new Logger();
    });

    it('should log messages', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        logger.log('Test message');

        expect(consoleSpy).toHaveBeenCalledWith('Test message');
    });
});
