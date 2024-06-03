import { Subject } from 'rxjs';

export const eventEmitter = new Subject<any>();

export function Event(eventName: string): MethodDecorator {
  return (target, propertyKey: string | symbol) => {
    eventEmitter.subscribe((event: { name: string, data: any }) => {
      if (event.name === eventName) {
        (target as any)[propertyKey](event.data);
      }
    });
  };
}
