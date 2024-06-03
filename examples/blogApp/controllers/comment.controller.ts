import { Controller, Route, eventEmitter, Event, Middleware, Logger } from '../../../src/framework';
import { IncomingMessage, ServerResponse } from 'http';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment.model';

// Define middleware
const logMiddleware: Middleware = (req, res, next) => {
  Logger.log(`${req.method} ${req.url}`);
  next();
};

@Controller('/comments')
class CommentController {
  private commentService: CommentService;

  constructor() {
    this.commentService = new CommentService();
  }

  @Route('get', '/', undefined, [logMiddleware])
  getAllComments(req: IncomingMessage, res: ServerResponse) {
    this.commentService.getComments().subscribe(comments => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(comments));
    });
  }

  @Route('post', '/', 'commentCreated', [logMiddleware])
  createComment(req: IncomingMessage, res: ServerResponse) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const newComment: Partial<Comment> = JSON.parse(body);
      this.commentService.createComment(newComment).subscribe(comment => {
        eventEmitter.next({ name: 'commentCreated', data: comment });
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(comment));
      });
    });
  }

  @Event('commentCreated')
  onCommentCreated(comment: Comment) {
    Logger.log(`Comment created: ${JSON.stringify(comment)}`);
  }
}

export { CommentController };
