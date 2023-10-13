export type LeaderBoardType = 'home' | 'away';

export interface LeaderBoard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

/*
make a comment to reference this file = {
  - `Classificação`: Posição na classificação;
- `Time`: Nome do time;
- `P`: Total de Pontos;
- `J`: Total de Jogos;
- `V`: Total de Vitórias;
- `E`: Total de Empates;
- `D`: Total de Derrotas;
- `GP`: Gols marcados a favor;
- `GC`: Gols sofridos;
- `SG`: Saldo total de gols;
- `%`: Aproveitamento do time.
}
*/
