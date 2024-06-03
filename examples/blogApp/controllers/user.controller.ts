import { Controller, Route, eventEmitter, Event, Middleware, Logger } from '../../../src/framework';
import { IncomingMessage, ServerResponse } from 'http';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

// Define middleware
const logMiddleware: Middleware = (req, res, next) => {
  Logger.log(`${req.method} ${req.url}`);
  next();
};

@Controller('/users')
class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Route('get', '/', undefined, [logMiddleware])
  getAllUsers(req: IncomingMessage, res: ServerResponse) {
    this.userService.getUsers().subscribe(users => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(users));
    });
  }

  @Route('post', '/', 'userCreated', [logMiddleware])
  createUser(req: IncomingMessage, res: ServerResponse) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const newUser: Partial<User> = JSON.parse(body);
      this.userService.createUser(newUser).subscribe(user => {
        eventEmitter.next({ name: 'userCreated', data: user });
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(user));
      });
    });
  }

  @Event('userCreated')
  onUserCreated(user: User) {
    Logger.log(`User created: ${JSON.stringify(user)}`);
  }
}

export { UserController };
