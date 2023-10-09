import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import sequelize from '.';
import Teams from './Teams';

class Matches extends
  Model<InferAttributes<Matches>,
  InferCreationAttributes<Matches>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
    defaultValue: true,
  },
}, {
  sequelize,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

Matches.belongsTo(Teams, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

Matches.belongsTo(Teams, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

Teams.hasMany(Matches, {
  foreignKey: 'homeTeamId',
  as: 'homeMatches',
});

Teams.hasMany(Matches, {
  foreignKey: 'awayTeamId',
  as: 'awayMatches',
});

export default Matches;
