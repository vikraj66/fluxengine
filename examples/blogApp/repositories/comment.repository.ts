import { Comment } from '../models/comment.model';

export class CommentRepository {
  async findAll() {
    return Comment.findAll();
  }

  async create(comment: Partial<Comment>) {
    return Comment.create(comment);
  }
}
