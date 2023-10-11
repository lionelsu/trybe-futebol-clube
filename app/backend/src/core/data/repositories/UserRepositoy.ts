import { User } from '../../entities/User';

export interface UserRepository {
  findUser(email: string): Promise<User | null>
}
