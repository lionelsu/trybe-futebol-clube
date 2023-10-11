import { User } from '../../entities/User';
import Users from '../../../database/models/Users';
import { UserRepository } from '../repositories/UserRepositoy';

class SequelizeUsers implements UserRepository {
  private users = Users;

  async findUser(email: string): Promise<User | null> {
    return this.users.findOne({ where: { email } });
  }
}

export default SequelizeUsers;
