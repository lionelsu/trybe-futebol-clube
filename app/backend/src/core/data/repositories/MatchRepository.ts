import { Match } from '../../entities/Match';

export interface MatchRepository {
  findAll(): Promise<Match[]>;
  finishMatch(id: number): Promise<number>;
  findByProgress(progress: boolean): Promise<Match[]>;
  // findById(id: number): Promise<Match | null>;
}
