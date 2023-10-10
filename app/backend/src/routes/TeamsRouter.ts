import { Request, Response, Router } from 'express';
import TeamsController from '../controllers/TeamsController';
import SequelizeTeams from '../core/data/providers/SequelizeTeams';

const sequelizeTeams = new SequelizeTeams();

const teamsController = new TeamsController(sequelizeTeams);
const teamsRouter = Router();

teamsRouter.get('/', (req: Request, res: Response) =>
  teamsController.findAll(req, res));

export default teamsRouter;
