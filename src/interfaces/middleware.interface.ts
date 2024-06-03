import { IncomingMessage, ServerResponse } from 'http';

export type MiddlewareInterface = (req: IncomingMessage, res: ServerResponse, next: Function) => void;
