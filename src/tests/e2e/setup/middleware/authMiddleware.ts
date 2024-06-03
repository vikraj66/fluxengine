import * as http from 'http';
import { Middleware } from '@/core/middleware';

export const AuthMiddleware: Middleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === 'valid-token') {
        next();
    } else {
        res.statusCode = 401;
        res.end('Unauthorized');
    }
};
