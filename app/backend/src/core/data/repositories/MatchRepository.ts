import { Match } from '../../entities/Match';

export interface MatchRepository {
  findAll(): Promise<Match[]>;
  finishMatch(id: number): Promise<number>;
  findByProgress(progress: boolean): Promise<Match[]>;
  updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<number>;
  // findById(id: number): Promise<Match | null>;
}
