export interface RouteDefinition {
  method: 'get' | 'post' | 'delete' | 'put';
  path: string;
  handlerName: string;
  event?: string;
  middlewares?: Function[];
  fullPath?: string;
  handler?: Function;
}
