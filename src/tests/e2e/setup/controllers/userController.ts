import * as http from 'http';
import { Controller, Route } from '@/core/controller';

@Controller('/users')
export class UserController {
    @Route('get', '/')
    getAllUsers(req: http.IncomingMessage, res: http.ServerResponse) {
        res.statusCode = 200;
        res.end(JSON.stringify([{ id: 1, name: 'John Doe' }]));
    }

    @Route('get', '/:id')
    getUserById(req: http.IncomingMessage, res: http.ServerResponse) {
        const userId = req.url?.split('/')[2];
        res.statusCode = 200;
        res.end(JSON.stringify({ id: userId, name: 'John Doe' }));
    }
}
