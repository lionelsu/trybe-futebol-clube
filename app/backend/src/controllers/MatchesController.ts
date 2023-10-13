import { Request, Response } from 'express';
import MatchService from '../core/services/MatchService';

class MatchesController {
  constructor(private readonly matchService: MatchService) {}

  async findAll(_req: Request, res: Response) {
    const matchesData = await this.matchService.findAll();
    res.status(200).json(matchesData);
  }
}

export default MatchesController;
