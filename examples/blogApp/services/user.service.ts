import { UserRepository } from '../repositories/user.repository';
import { from, Observable } from 'rxjs';
import { User } from '../models/user.model';

export class UserService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  getUsers(): Observable<User[]> {
    return from(this.userRepo.findAll());
  }

  createUser(user: Partial<User>): Observable<User> {
    return from(this.userRepo.create(user));
  }
}
