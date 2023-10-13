import { Match } from '../entities/Match';
import { MatchRepository } from '../data/repositories/MatchRepository';

class MatchService {
  private matchRepository: MatchRepository;

  constructor(matchRepository: MatchRepository) {
    this.matchRepository = matchRepository;
  }

  async findAll(): Promise<Match[]> {
    return this.matchRepository.findAll();
  }

  async finishMatch(id: number): Promise<number> {
    return this.matchRepository.finishMatch(id);
  }

  async findByProgress(progress: boolean): Promise<Match[]> {
    return this.matchRepository.findByProgress(progress);
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<number> {
    return this.matchRepository.updateMatch(id, homeTeamGoals, awayTeamGoals);
  }
}

export default MatchService;
