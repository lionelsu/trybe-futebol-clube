import { Team } from '../../entities/Team';
import Teams from '../../../database/models/Teams';
import { TeamRepository } from '../repositories/TeamRepository';

class SequelizeTeams implements TeamRepository {
  private teams = Teams;

  async findAll(): Promise<Team[]> {
    const teamsData = await this.teams.findAll();
    return teamsData.map((team) => team.toJSON());
  }
}

export default SequelizeTeams;
