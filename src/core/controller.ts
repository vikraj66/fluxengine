import 'reflect-metadata';

export function Controller(prefix: string): ClassDecorator {
    return target => {
        Reflect.defineMetadata('prefix', prefix, target);
        if (!Reflect.hasMetadata('routes', target)) {
            Reflect.defineMetadata('routes', [], target);
        }
    };
}

export function Route(method: 'get' | 'post' | 'delete' | 'put', path: string, event?: string, middlewares: Function[] = []): MethodDecorator {
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
        const routes = Reflect.getMetadata('routes', target.constructor) as any[] || [];
        routes.push({
            method,
            path,
            handlerName: propertyKey,
            event,
            middlewares
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    };
}
