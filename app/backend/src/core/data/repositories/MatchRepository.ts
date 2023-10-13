import { Match } from '../../entities/Match';

export interface MatchRepository {
  findAll(): Promise<Match[]>;
}
