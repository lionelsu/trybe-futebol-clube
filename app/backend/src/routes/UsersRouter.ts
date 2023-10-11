import { Request, Response, Router } from 'express';
import UsersController from '../controllers/UsersController';
import SequelizeUsers from '../core/data/providers/SequelizeUsers';
import UserService from '../core/services/UserService';
import joiValidateSchema from '../middlewares/joiValidateSchema';
import authMiddleware from '../middlewares/authMiddleware';

const sequelizeUsers = new SequelizeUsers();
const userService = new UserService(sequelizeUsers);
const usersController = new UsersController(userService);

const usersRouter = Router();

usersRouter.post('/', joiValidateSchema.loginField, (req: Request, res: Response) =>
  usersController.findUser(req, res));

usersRouter.get('/role', authMiddleware, (req: Request, res: Response) =>
  UsersController.getRole(req, res));

export default usersRouter;
