import { Team } from '../entities/Team';
import { TeamRepository } from '../data/repositories/TeamRepository';

class TeamService {
  private teamRepository: TeamRepository;

  constructor(teamRepository: TeamRepository) {
    this.teamRepository = teamRepository;
  }

  async findAll(): Promise<Team[]> {
    return this.teamRepository.findAll();
  }

  async findById(id: number): Promise<Team | null> {
    return this.teamRepository.findById(id);
  }
}

export default TeamService;
