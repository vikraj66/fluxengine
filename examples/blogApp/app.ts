import { App, Logger } from '../../src/framework';
import { UserController } from './controllers/user.controller';
import { PostController } from './controllers/post.controller';
import { CommentController } from './controllers/comment.controller';
import { sequelize } from './database';

// Sync database and initialize app
sequelize.sync().then(() => {
    // Create an instance of the app
    const app = new App();

    // Use global middleware
    const logMiddleware = (req, res, next) => {
        Logger.log(`${req.method} ${req.url}`);
        next();
    };
    app.use(logMiddleware);

    // Set the global error handler
    const errorHandler = (err: any, req: any, res: any) => {
        Logger.error(err.message);
        res.statusCode = 500;
        res.end('Internal Server Error');
    };
    app.setErrorHandler(errorHandler);

    // Register the controllers
    app.registerController(UserController);
    app.registerController(PostController);
    app.registerController(CommentController);

    // Start the server
    app.listen(3000, () => {
        Logger.log('Server is running on port 3000');
    });
});
