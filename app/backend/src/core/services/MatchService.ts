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
}

export default MatchService;
