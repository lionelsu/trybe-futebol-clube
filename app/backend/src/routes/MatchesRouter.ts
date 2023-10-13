import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import SequelizeMatches from '../core/data/providers/SequelizeMatches';
import MatchService from '../core/services/MatchService';

const sequelizeMatches = new SequelizeMatches();
const matchService = new MatchService(sequelizeMatches);
const matchesController = new MatchesController(matchService);

const matchesRouter = Router();

matchesRouter.get('/', (req: Request, res: Response) =>
  matchesController.findAll(req, res));

export default matchesRouter;
