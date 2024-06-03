import * as http from 'http';
import { Middleware } from '@/core/middleware';

export const LoggingMiddleware: Middleware = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};
