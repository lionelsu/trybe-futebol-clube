import { Team } from '../../entities/Team';

export interface TeamRepository {
  findAll(): Promise<Team[]>;
}
