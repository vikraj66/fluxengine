import { Controller, Route, eventEmitter, Event, Middleware, Logger } from '../../../src/framework';
import { IncomingMessage, ServerResponse } from 'http';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';

// Define middleware
const logMiddleware: Middleware = (req, res, next) => {
  Logger.log(`${req.method} ${req.url}`);
  next();
};

@Controller('/posts')
class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  @Route('get', '/', undefined, [logMiddleware])
  getAllPosts(req: IncomingMessage, res: ServerResponse) {
    this.postService.getPosts().subscribe(posts => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(posts));
    });
  }

  @Route('post', '/', 'postCreated', [logMiddleware])
  createPost(req: IncomingMessage, res: ServerResponse) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const newPost: Partial<Post> = JSON.parse(body);
      this.postService.createPost(newPost).subscribe(post => {
        eventEmitter.next({ name: 'postCreated', data: post });
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(post));
      });
    });
  }

  @Event('postCreated')
  onPostCreated(post: Post) {
    Logger.log(`Post created: ${JSON.stringify(post)}`);
  }
}

export { PostController };
