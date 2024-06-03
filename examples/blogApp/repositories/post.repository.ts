import { Post } from '../models/post.model';

export class PostRepository {
  async findAll() {
    return Post.findAll();
  }

  async create(post: Partial<Post>) {
    return Post.create(post);
  }
}
