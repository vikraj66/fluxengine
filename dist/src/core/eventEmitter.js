"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = exports.eventEmitter = void 0;
const rxjs_1 = require("rxjs");
exports.eventEmitter = new rxjs_1.Subject();
function Event(eventName) {
    return (target, propertyKey) => {
        exports.eventEmitter.subscribe((event) => {
            if (event.name === eventName) {
                target[propertyKey](event.data);
            }
        });
    };
}
exports.Event = Event;
