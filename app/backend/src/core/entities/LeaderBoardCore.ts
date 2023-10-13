import { LeaderBoard, LeaderBoardType } from './LeaderBoard';
import { Match } from './Match';
import { Team } from './Team';

class LeaderBoardCore {
  name: string;
  totalPoints = 0;
  totalGames = 0;
  totalVictories = 0;
  totalDraws = 0;
  totalLosses = 0;
  goalsFavor = 0;
  goalsOwn = 0;
  goalsBalance = 0;
  efficiency = 0;

  constructor(
    team: Team,
    finishedMatches: Match[],
    type: LeaderBoardType,
  ) {
    this.name = team.teamName;
    this.calculateStatistics(team, finishedMatches, type);
  }

  private calculateStatistics(team: Team, finishedMatches: Match[], type: LeaderBoardType): void {
    this.allGamesPlayed(team, finishedMatches, type);
    this.getTotalPoints();
    this.goalsData(team, finishedMatches, type);
    this.getEfficiency();
  }

  private allGamesPlayed(
    team: Team,
    finishedMatches: Match[],
    type: LeaderBoardType,
  ): void {
    const gamesPlayed = finishedMatches
      .filter((match) => match[`${type}TeamId`] === team.id);
    this.totalGames = gamesPlayed.length;

    const opponent = type === 'home' ? 'away' : 'home';
    this.totalVictories = gamesPlayed
      .filter((match) => match[`${type}TeamGoals`] > match[`${opponent}TeamGoals`]).length;
    this.totalLosses = gamesPlayed
      .filter((match) => match[`${type}TeamGoals`] < match[`${opponent}TeamGoals`]).length;
    this.totalDraws = gamesPlayed
      .filter((match) => match[`${type}TeamGoals`] === match[`${opponent}TeamGoals`]).length;
  }

  private getTotalPoints(): void {
    this.totalPoints = this.totalVictories * 3 + this.totalDraws;
  }

  private goalsData(team: Team, finishedMatches: Match[], type: LeaderBoardType): void {
    const gamesPlayed = finishedMatches
      .filter((match) => match[`${type}TeamId`] === team.id);
    this.goalsFavor = gamesPlayed.reduce((acc, match) => acc + match[`${type}TeamGoals`], 0);

    const opponent = type === 'home' ? 'away' : 'home';
    this.goalsOwn = gamesPlayed.reduce((acc, match) => acc + match[`${opponent}TeamGoals`], 0);
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  private getEfficiency(): void {
    this.efficiency = parseFloat(((this.totalPoints / (this.totalGames * 3)) * 100)
      .toFixed(2)) || 0;
  }

  private static leaderBoardsByTeam(homeTeam: LeaderBoard, awayTeams: LeaderBoard[]): LeaderBoard {
    const awayTeam = awayTeams.find((team) => team.name === homeTeam.name);
    if (!awayTeam) return homeTeam;
    return {
      name: homeTeam.name,
      totalPoints: homeTeam.totalPoints + awayTeam.totalPoints,
      totalGames: homeTeam.totalGames + awayTeam.totalGames,
      totalVictories: homeTeam.totalVictories + awayTeam.totalVictories,
      totalDraws: homeTeam.totalDraws + awayTeam.totalDraws,
      totalLosses: homeTeam.totalLosses + awayTeam.totalLosses,
      goalsFavor: homeTeam.goalsFavor + awayTeam.goalsFavor,
      goalsOwn: homeTeam.goalsOwn + awayTeam.goalsOwn,
      goalsBalance: homeTeam.goalsBalance + awayTeam.goalsBalance,
      efficiency: parseFloat(
        (((homeTeam.totalPoints + awayTeam.totalPoints)
        / ((homeTeam.totalGames + awayTeam.totalGames) * 3)) * 100).toFixed(2),
      ) || 0,
    };
  }

  static allLeaderBoard(
    homeTeams: LeaderBoard[],
    awayTeams: LeaderBoard[],
  ): LeaderBoard[] {
    const allData = homeTeams
      .map((homeTeam) => LeaderBoardCore.leaderBoardsByTeam(homeTeam, awayTeams));
    return allData;
  }

  static sortLeaderboards(leaderboards: LeaderBoard[]): LeaderBoard[] {
    return leaderboards
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);
  }
}

export default LeaderBoardCore;
