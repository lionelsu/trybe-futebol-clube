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
}

export default TeamService;
