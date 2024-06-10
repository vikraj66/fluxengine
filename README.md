# WayOfTheNode Framework

## Introduction

Welcome to the WayOfTheNode framework! This framework is designed to help you build modular and scalable Node.js applications with ease. It provides a structured approach to manage routing, middleware, error handling, logging, and more, using decorators and other modern JavaScript/TypeScript features.

## Features

- **Modularity**: Easily manage different parts of your application.
- **Middleware Support**: Integrate custom middleware for request handling.
- **Decorators**: Use decorators to define routes and controllers.
- **Routing**: Flexible routing system.
- **Error Handling**: Robust error handling mechanism.
- **Logging**: Integrated logging functionality.

## Getting Started

This guide will help you get started with the WayOfTheNode framework.

### Installation

First, install the WayOfTheNode package:

```bash
npm install wayofthenode
```

### Basic Setup

Here is a basic example to get you started:

```typescript
import { App, Controller, Route } from 'wayofthenode';

@Controller('/api')
class HelloController {
  @Route('get', '/hello')
  sayHello(req, res) {
    res.end('Hello, World!');
  }
}

const app = new App();
app.registerController(new HelloController());
app.listen(3000, () => console.log('Server is running on port 3000'));
```

## Core Components

### App

The `App` class is the entry point of the framework, integrating the main components such as the server, router, middleware manager, error handler, and logger.

#### Features

- **Middleware Integration**: Use the `use` method to add middleware.
- **Error Handling**: Use the `setErrorHandler` method to set a global error handler.
- **Controller Registration**: Use the `registerController` method to register controllers.
- **Server Management**: Start and stop the server with `listen` and `close` methods.
- **Custom Request Handling**: Use the `setRequestHandler` method to set a custom request handler with CORS support.

#### Example

```typescript
import { App, Middleware } from 'wayofthenode';

const loggingMiddleware: Middleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const app = new App();
app.use(loggingMiddleware);

app.listen(3000, () => console.log('Server is running on port 3000'));
```

### Controller

The `Controller` decorator is used to define the base path for a controller, and the `Route` decorator is used to define individual routes within the controller.

#### Example

```typescript
import { App, Controller, Route } from 'wayofthenode';

@Controller('/api')
class HelloController {
  @Route('get', '/hello')
  sayHello(req, res) {
    res.end('Hello, World!');
  }
}

const app = new App();
app.registerController(new HelloController());
app.listen(3000, () => console.log('Server is running on port 3000'));
```

### ErrorHandler

The `ErrorHandler` class manages global error handling for the application.

#### Features

- **Default Error Handler**: Logs errors and responds with a 500 status code.
- **Custom Error Handler**: Set a custom error handler with the `setErrorHandler` method.

#### Example

```typescript
import { App, Controller, Route, ErrorHandler } from 'wayofthenode';

@Controller('/api')
class HelloController {
  @Route('get', '/hello')
  sayHello(req, res) {
    throw new Error('Something went wrong');
  }
}

const errorHandler: ErrorHandler = (err, req, res) => {
  res.statusCode = 500;
  res.end(`Error: ${err.message}`);
};

const app = new App();
app.setErrorHandler(errorHandler);
app.registerController(new HelloController());
app.listen(3000, () => console.log('Server is running on port 3000'));
```

### Middleware

The `Middleware` interface and `MiddlewareManager` class manage middleware functions and their execution.

#### Example

```typescript
import { App, Middleware } from 'wayofthenode';

const loggingMiddleware: Middleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const app = new App();
app.use(loggingMiddleware);

app.listen(3000, () => console.log('Server is running on port 3000'));
```

### Router

The `Router` class manages routing of HTTP requests.

#### Features

- **Route Matching**: Matches incoming requests to registered routes.
- **Controller Registration**: Use the `registerController` method to register controllers and their routes.
- **Request Handling**: Handles requests and executes the corresponding route handler and middleware.

#### Example

```typescript
import { App, Controller, Route } from 'wayofthenode';

@Controller('/api')
class MyController {
  @Route('get', '/hello')
  sayHello(req, res) {
    res.end('Hello, World!');
  }

  @Route('get', '/goodbye')
  sayGoodbye(req, res) {
    res.end('Goodbye, World!');
  }
}

const app = new App();
app.registerController(new MyController());
app.listen(3000, () => console.log('Server is running on port 3000'));
```

### Server

The `Server` class manages the HTTP server.

#### Features

- **Request Handling**: Default request handler that integrates the router and error handler.
- **Custom Request Handler**: Set a custom request handler with CORS support using the `setRequestHandler` method.
- **Server Management**: Start and stop the server with `listen` and `close` methods.

#### Example

```typescript
import { App, Controller, Route, ErrorHandler } from 'wayofthenode';

@Controller('/api')
class HelloController {
  @Route('get', '/hello')
  sayHello(req, res) {
    res.end('Hello, World!');
  }
}

const errorHandler: ErrorHandler = (err, req, res) => {
  res.statusCode = 500;
  res.end(`Error: ${err.message}`);
};

const app = new App();
app.setErrorHandler(errorHandler);
app.registerController(new HelloController());
app.listen(3000, () => console.log('Server is running on port 3000'));
```

## Utils Folder

### Config

Provides configuration constants used throughout the framework.

#### Example

```typescript
export const config = {
  port: 3000,
};
```

### Constants

Defines general constants used in the framework.

#### Example

```typescript
export const constants = {
  APP_NAME: 'Event Decorator Framework',
};
```

### Utils

Contains utility functions that provide common functionalities used across the framework.

#### Example

```typescript
export const utils = {
  generateId: () => Math.random().toString(36).substr(2, 9),
};
```

## Advanced Examples

### Using Path Parameters

Handle path parameters in your routes.

```typescript
import { App, Controller, Route } from 'wayofthenode';

@Controller('/api')
class UserController {
  @Route('get', '/user/:id')
  getUser(req, res) {
    const userId = req.params.id;
    res.end(`User ID: ${userId}`);
  }
}

const app = new App();
app.registerController(new UserController());
app.listen(3000, () => console.log('Server is running on port 3000'));
```

### Using Query Parameters

Handle query parameters in your routes.

```typescript
import { App, Controller, Route } from 'wayofthenode';

@Controller('/api')
class SearchController {
  @Route('get', '/search')
  search(req, res) {
    const query = req.query.q;
    res.end(`Search query: ${query}`);
  }
}

const app = new App();
app.registerController(new SearchController());
app.listen(3000, () => console.log('Server is running on port 3000'));
```

### JSON Response and POST Request

Handle POST requests and send JSON responses.

```typescript
import { App, Controller, Route } from 'wayofthenode';

@Controller('/api')
class DataController {
  @Route('post', '/data')
  postData(req, res) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const data = JSON.parse(body);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ received: data }));
    });
  }
}

const app = new App();
app.registerController(new DataController());
app.listen(3000, () => console.log('Server is running on port 3000'));
```

### Combining Middleware and Controllers

Combine middleware and controllers to build a more complex application.

```typescript
import { App, Controller, Route, Middleware } from 'wayofthenode';

const loggingMiddleware: Middleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

@Controller('/api')
class HelloController {
  @Route('get', '/hello')
  sayHello(req, res) {
    res.end('Hello, World!');
  }
}

@Controller('/api')
class UserController {
  @Route('get', '/user/:id')
  getUser(req, res) {
    const userId = req.params.id;
    res.end(`User ID: ${userId}`);
  }
}

const app = new App();
app.use(loggingMiddleware);
app.registerController(new HelloController());
app.registerController(new UserController());
app.listen(3000, () => console.log('Server

 is running on port 3000'));
```

### Custom Error Handling

Set up custom error handling to handle specific errors.

```typescript
import { App, Controller, Route, ErrorHandler } from 'wayofthenode';

@Controller('/api')
class HelloController {
  @Route('get', '/hello')
  sayHello(req, res) {
    throw new Error('Something went wrong');
  }
}

const customErrorHandler: ErrorHandler = (err, req, res) => {
  if (err.message === 'Something went wrong') {
    res.statusCode = 400;
    res.end('Bad Request');
  } else {
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
};

const app = new App();
app.setErrorHandler(customErrorHandler);
app.registerController(new HelloController());
app.listen(3000, () => console.log('Server is running on port 3000'));
```

### Using Custom Logger

Use a custom logger to log messages in a specific format.

```typescript
import { App, Controller, Route, Logger } from 'wayofthenode';

class CustomLogger extends Logger {
  log(message: string) {
    console.log(`[CustomLogger] ${message}`);
  }
}

@Controller('/api')
class HelloController {
  @Route('get', '/hello')
  sayHello(req, res) {
    res.end('Hello, World!');
  }
}

const app = new App({ logger: new CustomLogger() });
app.registerController(new HelloController());
app.listen(3000, () => console.log('Server is running on port 3000'));
```

### Advanced Middleware Usage

Create advanced middleware to handle authentication.

```typescript
import { App, Controller, Route, Middleware } from 'wayofthenode';

const authMiddleware: Middleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === 'Bearer mysecrettoken') {
    next();
  } else {
    res.statusCode = 401;
    res.end('Unauthorized');
  }
};

@Controller('/api')
class ProtectedController {
  @Route('get', '/protected', 'get', [authMiddleware])
  protectedRoute(req, res) {
    res.end('This is a protected route');
  }
}

const app = new App();
app.registerController(new ProtectedController());
app.listen(3000, () => console.log('Server is running on port 3000'));
```

### Dynamic Route Handling

Create dynamic routes that handle various HTTP methods.

```typescript
import { App, Controller, Route } from 'wayofthenode';

@Controller('/api')
class DynamicController {
  @Route('get', '/resource')
  getResource(req, res) {
    res.end('GET resource');
  }

  @Route('post', '/resource')
  createResource(req, res) {
    res.end('POST resource');
  }

  @Route('put', '/resource')
  updateResource(req, res) {
    res.end('PUT resource');
  }

  @Route('delete', '/resource')
  deleteResource(req, res) {
    res.end('DELETE resource');
  }
}

const app = new App();
app.registerController(new DynamicController());
app.listen(3000, () => console.log('Server is running on port 3000'));
```

### Using Event Emitters

Extend the framework with custom event emitters.

```typescript
import { App, Controller, Route, CustomEventEmitter } from 'wayofthenode';

const eventEmitter = new CustomEventEmitter();

@Controller('/api')
class EventController {
  @Route('get', '/emit')
  emitEvent(req, res) {
    eventEmitter.emit('customEvent', 'Hello from event emitter');
    res.end('Event emitted');
  }
}

eventEmitter.on('customEvent', (message) => {
  console.log(message);
});

const app = new App();
app.registerController(new EventController());
app.listen(3000, () => console.log('Server is running on port 3000'));
```

### File Upload Handling

Handle file uploads using middleware.

```typescript
import { App, Controller, Route, Middleware } from 'wayofthenode';
import * as formidable from 'formidable';

const fileUploadMiddleware: Middleware = (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    req['files'] = files;
    next();
  });
};

@Controller('/api')
class UploadController {
  @Route('post', '/upload', 'post', [fileUploadMiddleware])
  uploadFile(req, res) {
    const files = req['files'];
    res.end(`Uploaded file: ${JSON.stringify(files)}`);
  }
}

const app = new App();
app.registerController(new UploadController());
app.listen(3000, () => console.log('Server is running on port 3000'));
```

## Conclusion

The WayOfTheNode framework provides a robust and flexible structure for building Node.js applications. With support for decorators, middleware, error handling, and more, it allows you to create modular and scalable applications with ease. The examples provided in this documentation should help you get started and explore the various features of the framework.