import { Request, Response } from 'express';
import TeamService from '../core/services/TeamService';

class TeamsController {
  constructor(private readonly teamService: TeamService) {}

  async findAll(_req: Request, res: Response) {
    const teamsData = await this.teamService.findAll();

    res.status(200).json(teamsData);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const teamData = await this.teamService.findById(Number(id));

    res.status(200).json(teamData);
  }
}

export default TeamsController;
