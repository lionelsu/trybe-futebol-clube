import { Match } from '../../entities/Match';

export type MatchData = Omit<Match, 'id' | 'inProgress'>;

export interface MatchRepository {
  findAll(): Promise<Match[]>;
  finishMatch(id: number): Promise<number>;
  findByProgress(progress: boolean): Promise<Match[]>;
  updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<number>;
  createMatch(match: MatchData): Promise<Match>;
  // findById(id: number): Promise<Match | null>;
}
