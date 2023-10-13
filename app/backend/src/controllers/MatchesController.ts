import { Request, Response } from 'express';
import MatchService from '../core/services/MatchService';

class MatchesController {
  constructor(private readonly matchService: MatchService) {}

  async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress === 'true' || inProgress === 'false') {
      const matchesData = await this.matchService.findByProgress(JSON.parse(inProgress));
      return res.status(200).json(matchesData);
    }

    const matchesData = await this.matchService.findAll();
    res.status(200).json(matchesData);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await this.matchService.finishMatch(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const isUpdatedMatch = await this.matchService
      .updateMatch(Number(id), homeTeamGoals, awayTeamGoals);

    if (!isUpdatedMatch) {
      return res.status(400).json({ message: 'Match not found' });
    }
    res.status(200).json({ message: 'Updated' });
  }
}

export default MatchesController;
