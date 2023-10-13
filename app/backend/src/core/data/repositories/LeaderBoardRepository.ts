import { LeaderBoard, LeaderBoardType } from '../../entities/LeaderBoard';

export interface LeaderBoardRepository {
  getLeaderBoard(type: LeaderBoardType): Promise<LeaderBoard[]>;
}
