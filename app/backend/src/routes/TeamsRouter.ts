import { Request, Response, Router } from 'express';
import TeamsController from '../controllers/TeamsController';
import SequelizeTeams from '../core/data/providers/SequelizeTeams';
import TeamService from '../core/services/TeamService';

const sequelizeTeams = new SequelizeTeams();
const teamService = new TeamService(sequelizeTeams);
const teamsController = new TeamsController(teamService);

const teamsRouter = Router();

teamsRouter.get('/', (req: Request, res: Response) =>
  teamsController.findAll(req, res));
teamsRouter.get('/:id', (req: Request, res: Response) =>
  teamsController.findById(req, res));

export default teamsRouter;
