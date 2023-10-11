import { Request, Response } from 'express';
import UserService from '../core/services/UserService';

class UsersController {
  constructor(private readonly userService: UserService) {}

  async findUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userData = await this.userService.login(email, password);

      return res.status(200).json(userData);
    } catch (e) {
      return res.status(401).json(e);
    }
  }

  static getRole(_req: Request, res: Response) {
    const { role } = res.locals.user;

    return res.status(200).json({ role });
  }
}

export default UsersController;
