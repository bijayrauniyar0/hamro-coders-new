import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './userModels';
import Test from './mockTestModel';
import MockTest from './mockTestModel';

class UserScores extends Model {
  public id!: number;
  public User!: { name: string; id: number };
  public user_id!: number;
  public score!: number;
  public test_id!: string;
  public MockTest!: MockTest;
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
    mock_test_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

UserScores.belongsTo(Test, {
  foreignKey: 'mock_test_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Test.hasMany(UserScores, {
  foreignKey: 'mock_test_id',
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
