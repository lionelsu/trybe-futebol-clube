import { Request, Response } from 'express';
import { TeamRepository } from '../core/data/repositories/TeamRepository';

class TeamsController {
  constructor(private readonly teamService: TeamRepository) {}

  async findAll(_req: Request, res: Response) {
    const teamsData = await this.teamService.findAll();

    res.status(200).json(teamsData);
  }
}

export default TeamsController;
