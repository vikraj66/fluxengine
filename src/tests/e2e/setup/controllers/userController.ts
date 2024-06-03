import * as http from 'http';
import { Controller, Route } from '@/core/controller';
import { AuthMiddleware } from '../middleware/authMiddleware';

@Controller('/users')
export class UserController {
    @Route('get', '/', undefined, [AuthMiddleware])
    getAllUsers(req: http.IncomingMessage, res: http.ServerResponse) {
        console.log("get hit at req")
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
