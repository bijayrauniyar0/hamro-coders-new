import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './userModels';
import Subject from './subjectsModels';

class UserScores extends Model {
  public id!: number;
  public user_id!: number;
  public score!: number;
  public subject_id!: string;
  public previous_rank!: string | null;
  public readonly createdAt!: Date;
}

UserScores.init(
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
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    previous_rank: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: 'user_scores',
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

Subject.hasMany(UserScores, {
  foreignKey: 'subject_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

UserScores.belongsTo(Subject, {
  foreignKey: 'subject_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

User.hasMany(UserScores, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

UserScores.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default UserScores;
