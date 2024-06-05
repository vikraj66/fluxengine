Here is the updated `README.md` content with minimal changes, updated package name, and correct imports:

```markdown
# wayofnode

`wayofnode` is a TypeScript-based framework designed to simplify building server-side applications. It provides a structured and modular approach with core functionalities like routing, middleware management, error handling, and logging.

## Features
- **Modular Architecture**: Separate components for server, routing, middleware, and controllers.
- **Easy Configuration**: Simple configuration options to set up your application.
- **Middleware Support**: Easily add and manage middleware functions.
- **Robust Error Handling**: Centralized error handling for better debugging and maintenance.
- **Logging**: Basic logging functionality for better monitoring.

## Installation

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

1. **Node.js** (version 12.x or later)
2. **npm** (version 6.x or later) or **Yarn** (version 1.x or later)
3. **TypeScript** (version 4.x or later)

### Step-by-Step Instructions

1. **Initialize Your Project**

    ```bash
    mkdir my-wayofnode-app
    cd my-wayofnode-app
    npm init -y
    ```

2. **Install Dependencies**

    ```bash
    npm install wayofnode reflect-metadata
    ```

    If you prefer to use Yarn, you can run:

    ```bash
    yarn add wayofnode reflect-metadata
    ```

3. **Set Up TypeScript**

    Initialize a TypeScript configuration file (`tsconfig.json`):

    ```bash
    npx tsc --init
    ```

    Modify the `tsconfig.json` to include the necessary settings:

    ```json
    {
      "compilerOptions": {
        "target": "ES6",
        "module": "commonjs",
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true,
        "esModuleInterop": true,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
      },
      "include": ["src/**/*.ts"],
      "exclude": ["node_modules", "dist"]
    }
    ```

4. **Create Directory Structure**

    Create the following directories to organize your project:

    ```bash
    mkdir -p src/controllers src/middleware src/utils src/core
    ```

5. **Create Core Files**

    - Create `app.ts` in `src/core/`

        ```typescript
        import { App } from 'wayofnode';
        import { UserController } from '../controllers/userController';
        import { AuthMiddleware } from '../middleware/authMiddleware';

        const app = new App();

        // Use middleware
        app.use(AuthMiddleware);

        // Register controllers
        app.registerController(new UserController());

        // Start the server
        app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
        ```

    - Create `userController.ts` in `src/controllers/`

        ```typescript
        import { Controller, Route } from 'wayofnode';

        @Controller('/users')
        export class UserController {

            @Route('get', '/')
            getAllUsers(req: any, res: any) {
                res.send([{ id: 1, name: 'John Doe' }]);
            }

            @Route('get', '/:id')
            getUserById(req: any, res: any) {
                const userId = req.params.id;
                res.send({ id: userId, name: 'John Doe' });
            }
        }
        ```

    - Create `authMiddleware.ts` in `src/middleware/`

        ```typescript
        import { Middleware } from 'wayofnode';

        export const AuthMiddleware: Middleware = (req, res, next) => {
            if (req.headers.authorization === 'valid-token') {
                next();
            } else {
                res.status(401).send('Unauthorized');
            }
        };
        ```

6. **Create Utility Files**

    - Create `customLogger.ts` in `src/utils/`

        ```typescript
        export class CustomLogger {
            static log(message: string) {
                console.log(`[LOG] ${message}`);
            }

            static error(message: string) {
                console.error(`[ERROR] ${message}`);
            }
        }
        ```

7. **Create Custom Error Handler**

    - Create `errorHandler.ts` in `src/core/`

        ```typescript
        import * as http from 'http';

        export class CustomErrorHandler {
            private handler: (err: any, req: http.IncomingMessage, res: http.ServerResponse) => void | Promise<void>;

            constructor() {
                this.handler = (err, req, res) => {
                    console.error(err);  // Ensure the error is logged
                    res.statusCode = 500;
                    res.end('Internal Server Error');
                };
            }

            setErrorHandler(handler: (err: any, req: http.IncomingMessage, res: http.ServerResponse) => void | Promise<void>) {
                this.handler = handler;
            }

            async handleError(err: any, req: http.IncomingMessage, res: http.ServerResponse) {
                try {
                    await this.handler(err, req, res);
                } catch (error) {
                    console.error(error);  // Ensure the error is logged
                    res.statusCode = 500;
                    res.end('Internal Server Error');
                }
            }
        }
        ```

8. **Compile and Run the Project**

    Compile your TypeScript code to JavaScript:

    ```bash
    npx tsc
    ```

    Run the compiled JavaScript code:

    ```bash
    node dist/core/app.js
    ```

    You should see the message:

    ```
    Server started on port 3000
    ```

9. **Verify Your Setup**

    Open your web browser or use a tool like Postman to make requests to your server:

    - GET `http://localhost:3000/users`
    - GET `http://localhost:3000/users/1`

    Ensure that the middleware and controllers are working as expected.

## Detailed Usage and Examples

### Example 1: Basic Server Setup

Refer to the "Create Core Files" section above for setting up a basic server with a simple controller and middleware.

### Example 2: Error Handling

#### ErrorHandler Example

Create a file named `errorHandler.ts` in your `core` directory.

```typescript
import * as http from 'wayofnode';

export class CustomErrorHandler {
    private handler: (err: any, req: http.IncomingMessage, res: http.ServerResponse) => void | Promise<void>;

    constructor() {
        this.handler = (err, req, res) => {
            console.error(err);  // Ensure the error is logged
            res.statusCode = 500;
            res.end('Internal Server Error');
        };
    }

    setErrorHandler(handler: (err: any, req: http.IncomingMessage, res: http.ServerResponse) => void | Promise<void>) {
        this.handler = handler;
    }

    async handleError(err: any, req: http.IncomingMessage, res: http.ServerResponse) {
        try {
            await this.handler(err, req, res);
        } catch (error) {
            console.error(error);  // Ensure the error is logged
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
    }
}
```

### Example 3: Logging

#### Logger Example

Create a file named `customLogger.ts` in your `utils` directory.

```typescript
export class CustomLogger {
    static log(message: string) {
        console.log(`[LOG] ${message}`);
    }

    static error(message: string) {
        console.error(`[ERROR] ${message}`);
    }
}
```

#### Using Custom Logger in App

Update your `app.ts` to use the custom logger.

```typescript
import { App } from 'wayofnode';
import { UserController } from '../controllers/userController';
import { AuthMiddleware } from '../middleware/authMiddleware';
import { CustomLogger } from '../utils/customLogger';

const app = new App({
    logger: new CustomLogger()
});

// Use middleware
app.use(AuthMiddleware);

// Register controllers
app.registerController(new UserController());

// Start the server
app.listen(3000, () => {
    CustomLogger.log('Server started on port 3000');
});
```

### Example 4: Configuration

#### Config Example

Create a file named `config.ts` in your `utils` directory.

```typescript
export const config = {
    port: 3000
};
```

#### Using Config in App

Update your `app.ts` to use the configuration.

```typescript
import { App } from 'wayofnode';
import { UserController } from '../controllers/userController';
import { AuthMiddleware } from '../middleware/authMiddleware';
import { config } from '../utils/config';

const app = new App();

// Use middleware
app.use(AuthMiddleware);

// Register controllers
app.registerController(new UserController());

// Start the server
app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`);
});
```

### Example 5: Utility Functions

#### Utility Functions Example

Create a file named `utils.ts` in your `utils` directory.

```typescript
export const utils = {
    generateId: () => Math.random().toString(36).substr(2, 9),
};
```

#### Using Utility Functions in Controller

Update your `userController.ts` to use utility functions.

```typescript
import { Controller, Route } from 'wayofnode';
import { utils } from '../utils/utils

';

@Controller('/users')
export class UserController {

    @Route('get', '/')
    getAllUsers(req: any, res: any) {
        res.send([{ id: utils.generateId(), name: 'John Doe' }]);
    }

    @Route('get', '/:id')
    getUserById(req: any, res: any) {
        const userId = req.params.id;
        res.send({ id: userId, name: 'John Doe' });
    }
}
```

### Example 6: Advanced Middleware

#### Logging Middleware Example

Create a file named `loggingMiddleware.ts` in your `middleware` directory.

```typescript
import { Middleware } from 'wayofnode';

export const LoggingMiddleware: Middleware = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};
```

#### Using Multiple Middleware in App

Update your `app.ts` to use multiple middleware functions.

```typescript
import { App } from 'wayofnode';
import { UserController } from '../controllers/userController';
import { AuthMiddleware } from '../middleware/authMiddleware';
import { LoggingMiddleware } from '../middleware/loggingMiddleware';

const app = new App();

// Use middleware
app.use(LoggingMiddleware);
app.use(AuthMiddleware);

// Register controllers
app.registerController(new UserController());

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
```

### Example 7: Route Parameters

#### Handling Route Parameters in Controller

Update your `userController.ts` to handle route parameters.

```typescript
import { Controller, Route } from 'wayofnode';

@Controller('/users')
export class UserController {

    @Route('get', '/')
    getAllUsers(req: any, res: any) {
        res.send([{ id: 1, name: 'John Doe' }]);
    }

    @Route('get', '/:id')
    getUserById(req: any, res: any) {
        const userId = req.params.id;
        res.send({ id: userId, name: 'John Doe' });
    }
}
```

### Example 8: Query Parameters

#### Handling Query Parameters in Controller

Update your `userController.ts` to handle query parameters.

```typescript
import { Controller, Route } from 'wayofnode';

@Controller('/users')
export class UserController {

    @Route('get', '/')
    getAllUsers(req: any, res: any) {
        const { page, limit } = req.query;
        res.send({
            page,
            limit,
            users: [{ id: 1, name: 'John Doe' }]
        });
    }

    @Route('get', '/:id')
    getUserById(req: any, res: any) {
        const userId = req.params.id;
        res.send({ id: userId, name: 'John Doe' });
    }
}
```

### Example 9: Post Requests

#### Handling Post Requests in Controller

Update your `userController.ts` to handle POST requests.

```typescript
import { Controller, Route } from 'wayofnode';

@Controller('/users')
export class UserController {

    @Route('get', '/')
    getAllUsers(req: any, res: any) {
        res.send([{ id: 1, name: 'John Doe' }]);
    }

    @Route('get', '/:id')
    getUserById(req: any, res: any) {
        const userId = req.params.id;
        res.send({ id: userId, name: 'John Doe' });
    }

    @Route('post', '/')
    createUser(req: any, res: any) {
        const newUser = req.body;
        res.send(newUser);
    }
}
```

### Example 10: Middleware for Specific Routes

#### Applying Middleware to Specific Routes

Update your `userController.ts` to apply middleware to specific routes.

```typescript
import { Controller, Route } from 'wayofnode';
import { AuthMiddleware } from '../middleware/authMiddleware';

@Controller('/users')
export class UserController {

    @Route('get', '/', [], [AuthMiddleware])
    getAllUsers(req: any, res: any) {
        res.send([{ id: 1, name: 'John Doe' }]);
    }

    @Route('get', '/:id', [], [AuthMiddleware])
    getUserById(req: any, res: any) {
        const userId = req.params.id;
        res.send({ id: userId, name: 'John Doe' });
    }
}
```

### Example 11: Custom Middleware Logic

#### Creating Custom Middleware

Create a file named `customMiddleware.ts` in your `middleware` directory.

```typescript
import { Middleware } from 'wayofnode';

export const CustomMiddleware: Middleware = (req, res, next) => {
    if (req.query.token === 'secret') {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
};
```

### Example 12: Advanced Routing

#### Nested Routes Example

Update your `userController.ts` to handle nested routes.

```typescript
import { Controller, Route } from 'wayofnode';

@Controller('/users')
export class UserController {

    @Route('get', '/')
    getAllUsers(req: any, res: any) {
        res.send([{ id: 1, name: 'John Doe' }]);
    }

    @Route('get', '/:id')
    getUserById(req: any, res: any) {
        const userId = req.params.id;
        res.send({ id: userId, name: 'John Doe' });
    }

    @Route('get', '/:id/posts')
    getUserPosts(req: any, res: any) {
        const userId = req.params.id;
        res.send([{ userId, postId: 1, title: 'First Post' }]);
    }
}
```

### Example 13: Static File Serving

#### Serving Static Files

Create a file named `staticMiddleware.ts` in your `middleware` directory.

```typescript
import { Middleware } from 'wayofnode';
import * as fs from 'fs';
import * as path from 'path';

export const StaticMiddleware: Middleware = (req, res, next) => {
    const filePath = path.join(__dirname, 'public', req.url);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            next();
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
};
```

#### Using Static Middleware in App

Update your `app.ts` to use static file serving.

```typescript
import { App } from 'wayofnode';
import { UserController } from '../controllers/userController';
import { AuthMiddleware } from '../middleware/authMiddleware';
import { StaticMiddleware } from '../middleware/staticMiddleware';

const app = new App();

// Use middleware
app.use(StaticMiddleware);
app.use(AuthMiddleware);

// Register controllers
app.registerController(new UserController());

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
```

### Example 14: Error Handling in Middleware

#### Middleware with Error Handling

Update your `authMiddleware.ts` to include error handling.

```typescript
import { Middleware } from 'wayofnode';

export const AuthMiddleware: Middleware = (req, res, next) => {
    try {
        if (req.headers.authorization === 'valid-token') {
            next();
        } else {
            throw new Error('Unauthorized');
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};
```

### Example 15: Combining All Features

#### Comprehensive App Example

Update your `app.ts` to combine all the features.

```typescript
import { App } from 'wayofnode';
import { UserController } from '../controllers/userController';
import { AuthMiddleware } from '../middleware/authMiddleware';
import { StaticMiddleware } from '../middleware/staticMiddleware';
import { CustomErrorHandler } from '../core/errorHandler';
import { CustomLogger } from '../utils/customLogger';

const app = new App({
    errorHandler: new CustomErrorHandler(),
    logger: new CustomLogger()
});

// Use middleware
app.use(StaticMiddleware);
app.use(AuthMiddleware);

// Register controllers
app.registerController(new UserController());

// Start the server
app.listen(3000, () => {
    CustomLogger.log('Server started on port 3000');
});
```

## Explanation

1. **Controllers**:
   - Controllers in `wayofnode` are classes decorated with the `@Controller` decorator, which takes a prefix for the routes.
   - Each method in the controller can be decorated with the `@Route` decorator to define the HTTP method and path.

2. **Middleware**:
   - Middleware functions in `wayofnode` follow the `(req, res, next)` signature and can be added globally using the `app.use` method.
   - Middleware can also be applied to specific routes using the `@Route` decorator.

3. **Error Handling**:
   - The `CustomErrorHandler` class provides a centralized way to handle errors in the application.
   - Error handling middleware can be used to catch and respond to errors within middleware functions.

4. **Logging**:
   - The `CustomLogger` class provides basic logging functionality for monitoring the application.
   - Logging middleware can be used to log each request made to the server.

5. **Configuration**:
   - The `config` object stores configuration settings such as the server port.
   - Configuration settings can be easily accessed throughout the application.


Utility Functions**:
   - The `utils` object provides general utility functions that can be used throughout the application.
   - Example utility function includes generating a random ID.

7. **Advanced Middleware**:
   - Middleware can include advanced logic such as logging requests or checking for query parameters.
   - Middleware can be applied globally or to specific routes.

8. **Routing**:
   - The `Router` class handles matching requests to defined routes and executing associated middleware and handlers.
   - Nested routes and query parameters can be easily handled within controllers.

9. **Static File Serving**:
   - The `StaticMiddleware` middleware can be used to serve static files from a directory.
   - Static file serving is handled directly within `wayofnode` without the need for external frameworks.

10. **Comprehensive App**:
    - The comprehensive app example combines all the features of `wayofnode` to create a robust server-side application.
    - The app uses custom error handling, logging, middleware, controllers, and configuration to provide a complete solution.
