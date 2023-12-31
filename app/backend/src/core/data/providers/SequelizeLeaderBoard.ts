import LeaderBoardCore from '../../entities/LeaderBoardCore';
import { LeaderBoard, LeaderBoardType } from '../../entities/LeaderBoard';
import SequelizeMatches from './SequelizeMatches';
import SequelizeTeams from './SequelizeTeams';

class SequelizeLeaderBoards {
  constructor(
    private teams = new SequelizeTeams(),
    private matches = new SequelizeMatches(),
  ) {}

  async getLeaderBoard(type: LeaderBoardType): Promise<LeaderBoard[]> {
    const teams = await this.teams.findAll();
    const finishedMatches = await this.matches.findByProgress(false);
    const leaderBoard = teams.map((team) => new LeaderBoardCore(team, finishedMatches, type));
    const sortLeaderBoard = LeaderBoardCore.sortLeaderboards(leaderBoard);
    return sortLeaderBoard;
  }

  async getAllLeaderBoards(): Promise<LeaderBoard[]> {
    const homeTeam = await this.getLeaderBoard('home');
    const awayTeam = await this.getLeaderBoard('away');
    const allTeamsLeaderBoard = LeaderBoardCore.allLeaderBoard(homeTeam, awayTeam);
    const sortLeaderboards = LeaderBoardCore.sortLeaderboards(allTeamsLeaderBoard);
    return sortLeaderboards;
  }
}

export default SequelizeLeaderBoards;
