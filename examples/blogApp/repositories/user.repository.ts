import { User } from '../models/user.model';

export class UserRepository {
  async findAll() {
    return User.findAll();
  }

  async create(user: Partial<User>) {
    return User.create(user);
  }
}
