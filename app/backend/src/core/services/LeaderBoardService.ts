import { LeaderBoardRepository } from '../data/repositories/LeaderBoardRepository';
import { LeaderBoard, LeaderBoardType } from '../entities/LeaderBoard';

class LeaderBoardService {
  private leaderBoardRepository: LeaderBoardRepository;

  constructor(leaderBoardRepository: LeaderBoardRepository) {
    this.leaderBoardRepository = leaderBoardRepository;
  }

  async getLeaderBoard(type: LeaderBoardType): Promise<LeaderBoard[]> {
    return this.leaderBoardRepository.getLeaderBoard(type);
  }
}

export default LeaderBoardService;
