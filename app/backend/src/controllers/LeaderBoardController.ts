import { Request, Response } from 'express';
import LeaderBoardService from '../core/services/LeaderBoardService';

class LeaderBoardController {
  constructor(private readonly leaderBoardService: LeaderBoardService) {}

  async getLeaderBoard(req: Request, res: Response) {
    const { path } = req.route;
    const leaderBoard = await this.leaderBoardService.getLeaderBoard(path.substring(1));
    res.status(200).json(leaderBoard);
  }
}

export default LeaderBoardController;
