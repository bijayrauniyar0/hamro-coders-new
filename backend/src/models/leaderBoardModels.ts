import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './userModels';
import Subject from './subjectsModels';

class LeaderBoard extends Model {
  public id!: number;
  public userId!: number;
  public score!: number;
  public subject_code!: string;
  public semester!: number;
  public readonly createdAt!: Date;
}

LeaderBoard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subject_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'leaderboard',
    sequelize,
    timestamps: true,
    updatedAt: false,
  },
);

User.hasMany(LeaderBoard, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Subject.hasMany(LeaderBoard, {
  foreignKey: 'subject_code',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

LeaderBoard.belongsTo(Subject, {
  foreignKey: 'subject_code',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

LeaderBoard.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default LeaderBoard;