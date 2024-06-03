import { PostRepository } from '../repositories/post.repository';
import { from, Observable } from 'rxjs';
import { Post } from '../models/post.model';

export class PostService {
  private postRepo: PostRepository;

  constructor() {
    this.postRepo = new PostRepository();
  }

  getPosts(): Observable<Post[]> {
    return from(this.postRepo.findAll());
  }

  createPost(post: Partial<Post>): Observable<Post> {
    return from(this.postRepo.create(post));
  }
}
