import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';
import SequelizeLeaderBoard from '../core/data/providers/SequelizeLeaderBoard';
import LeaderBoardService from '../core/services/LeaderBoardService';
// import authMiddleware from '../middlewares/authMiddleware';

const sequelizeLeaderBoard = new SequelizeLeaderBoard();
const leaderBoardService = new LeaderBoardService(sequelizeLeaderBoard);
const leaderBoardController = new LeaderBoardController(leaderBoardService);

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', (req: Request, res: Response) =>
  leaderBoardController.getLeaderBoard(req, res));

leaderBoardRouter.get('/away', (req: Request, res: Response) =>
  leaderBoardController.getLeaderBoard(req, res));

export default leaderBoardRouter;
