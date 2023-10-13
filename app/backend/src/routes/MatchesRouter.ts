import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import SequelizeMatches from '../core/data/providers/SequelizeMatches';
import MatchService from '../core/services/MatchService';
import authMiddleware from '../middlewares/authMiddleware';

const sequelizeMatches = new SequelizeMatches();
const matchService = new MatchService(sequelizeMatches);
const matchesController = new MatchesController(matchService);

const matchesRouter = Router();

matchesRouter.get('/', (req: Request, res: Response) =>
  matchesController.findAll(req, res));

matchesRouter.patch('/:id', authMiddleware, (req: Request, res: Response) =>
  matchesController.updateMatch(req, res));

matchesRouter.patch('/:id/finish', authMiddleware, (req: Request, res: Response) =>
  matchesController.finishMatch(req, res));

matchesRouter.post('/', authMiddleware, (req: Request, res: Response) =>
  matchesController.createMatch(req, res));

export default matchesRouter;
