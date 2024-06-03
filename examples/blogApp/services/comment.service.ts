import { CommentRepository } from '../repositories/comment.repository';
import { from, Observable } from 'rxjs';
import { Comment } from '../models/comment.model';

export class CommentService {
  private commentRepo: CommentRepository;

  constructor() {
    this.commentRepo = new CommentRepository();
  }

  getComments(): Observable<Comment[]> {
    return from(this.commentRepo.findAll());
  }

  createComment(comment: Partial<Comment>): Observable<Comment> {
    return from(this.commentRepo.create(comment));
  }
}
