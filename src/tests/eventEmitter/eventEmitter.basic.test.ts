import { CustomEventEmitter } from '../../core/eventEmitter';

describe('CustomEventEmitter Basic Functionality', () => {
    let eventEmitter: CustomEventEmitter;

    beforeEach(() => {
        eventEmitter = new CustomEventEmitter();
    });

    it('should register and trigger event listeners', () => {
        const listener = jest.fn();
        eventEmitter.on('testEvent', listener);

        eventEmitter.emit('testEvent');

        expect(listener).toHaveBeenCalled();
    });

    it('should pass arguments to event listeners', () => {
        const listener = jest.fn();
        eventEmitter.on('testEvent', listener);

        eventEmitter.emit('testEvent', 'arg1', 'arg2');

        expect(listener).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('should register one-time event listeners', () => {
        const listener = jest.fn();
        eventEmitter.once('testEvent', listener);

        eventEmitter.emit('testEvent');
        eventEmitter.emit('testEvent');

        expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should remove event listeners', () => {
        const listener = jest.fn();
        eventEmitter.on('testEvent', listener);
        eventEmitter.off('testEvent', listener);

        eventEmitter.emit('testEvent');

        expect(listener).not.toHaveBeenCalled();
    });

    it('should remove all listeners for an event', () => {
        const listener1 = jest.fn();
        const listener2 = jest.fn();
        eventEmitter.on('testEvent', listener1);
        eventEmitter.on('testEvent', listener2);

        eventEmitter.removeAllListeners('testEvent');

        eventEmitter.emit('testEvent');

        expect(listener1).not.toHaveBeenCalled();
        expect(listener2).not.toHaveBeenCalled();
    });

    it('should remove all listeners for all events', () => {
        const listener1 = jest.fn();
        const listener2 = jest.fn();
        eventEmitter.on('testEvent1', listener1);
        eventEmitter.on('testEvent2', listener2);

        eventEmitter.removeAllListeners();

        eventEmitter.emit('testEvent1');
        eventEmitter.emit('testEvent2');

        expect(listener1).not.toHaveBeenCalled();
        expect(listener2).not.toHaveBeenCalled();
    });

    it('should handle error events', () => {
        const errorListener = jest.fn();
        eventEmitter.on('error', errorListener);

        const error = new Error('Test Error');
        eventEmitter.emit('error', error);

        expect(errorListener).toHaveBeenCalledWith(error);
    });
});
