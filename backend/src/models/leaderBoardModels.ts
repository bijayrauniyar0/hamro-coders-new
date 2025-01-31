import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './userModels';

class LeaderBoard extends Model {
  public id!: number;
  public userId!: number;
  public score!: number;
}

LeaderBoard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    semester: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'leaderboard',
    sequelize,
    timestamps: true,
  },
);

User.hasMany(LeaderBoard, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

LeaderBoard.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
