import { IncomingMessage, ServerResponse } from 'http';

export type Middleware = (req: IncomingMessage, res: ServerResponse, next: Function) => void;
