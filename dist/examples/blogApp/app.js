"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framework_1 = require("../../src/framework");
const user_controller_1 = require("./controllers/user.controller");
const post_controller_1 = require("./controllers/post.controller");
const comment_controller_1 = require("./controllers/comment.controller");
const database_1 = require("./database");
// Sync database and initialize app
database_1.sequelize.sync().then(() => {
    // Create an instance of the app
    const app = new framework_1.App();
    // Use global middleware
    const logMiddleware = (req, res, next) => {
        framework_1.Logger.log(`${req.method} ${req.url}`);
        next();
    };
    app.use(logMiddleware);
    // Set the global error handler
    const errorHandler = (err, req, res) => {
        framework_1.Logger.error(err.message);
        res.statusCode = 500;
        res.end('Internal Server Error');
    };
    app.setErrorHandler(errorHandler);
    // Register the controllers
    app.registerController(user_controller_1.UserController);
    app.registerController(post_controller_1.PostController);
    app.registerController(comment_controller_1.CommentController);
    // Start the server
    app.listen(3000, () => {
        framework_1.Logger.log('Server is running on port 3000');
    });
});
