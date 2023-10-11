import { compareSync } from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import JWT from '../../auth/JWT';
import { UserRepository } from '../data/repositories/UserRepositoy';
import AppError from '../../utils/AppError';

class UserService {
  private userRepository: UserRepository;
  private jwt: JWT;

  constructor(
    userRepository: UserRepository,
    jwt: JWT = new JWT(),
  ) {
    this.userRepository = userRepository;
    this.jwt = jwt;
  }

  async login(email: string, password: string): Promise<string | JwtPayload> {
    const user = await this.userRepository.findUser(email);

    if (!user || !compareSync(password, user.password)) {
      throw new AppError('Invalid email or password');
    }

    const token = this.jwt.encrypt({ email: user.email, role: user.role });
    return { token };
  }
}
/*
const pass = 'secret';

(async () => {
  const teste = new UserService(new SequelizeUsers());
  console.log(await teste.login('admin@admin.com', pass));
})();
*/
export default UserService;
