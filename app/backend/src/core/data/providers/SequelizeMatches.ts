import { Match } from '../../entities/Match';
import Matches from '../../../database/models/Matches';
import { MatchRepository } from '../repositories/MatchRepository';
import Teams from '../../../database/models/Teams';

class SequelizeMatches implements MatchRepository {
  private matches = Matches;

  async findAll(): Promise<Match[]> {
    const matchesData = await this.matches.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matchesData.map((match) => match.toJSON());
  }

  async finishMatch(id: number): Promise<number> {
    const [updatedMatch] = await this.matches.update(
      { inProgress: false },
      { where: { id } },
    );
    return updatedMatch;
  }

  async findByProgress(inProgress: boolean): Promise<Match[]> {
    const matchesData = await this.matches.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matchesData.map((match) => match.toJSON());
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<number> {
    const [updatedMatch] = await this.matches.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return updatedMatch;
  }
}

export default SequelizeMatches;
