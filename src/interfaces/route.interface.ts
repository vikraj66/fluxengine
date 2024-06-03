export interface Route {
    method: 'get' | 'post' | 'delete' | 'put';
    path: string;
    handlerName: string;
    event?: string;
    middlewares?: Function[];
}
