import { Team } from '../../entities/Team';

export interface TeamRepository {
  findAll(): Promise<Team[]>;
  findById(id: number): Promise<Team | null>;
}
