import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './userModels';
import Subject from './subjectsModels';

class UserScores extends Model {
  public id!: number;
  public User!: { name: string; id: number };
  public user_id!: number;
  public score!: number;
  public subject_id!: string;
  public subject!: { title: string; id: number };
  public mode!: 'practice' | 'ranked';
  public elapsed_time!: number;
  public readonly created_at!: Date;
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
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mode: {
      type: DataTypes.ENUM('practice', 'ranked'),
      allowNull: false,
      defaultValue: 'practice',
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    elapsed_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'user_scores',
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  },
);


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
