// src/models/messageModel.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './userModels';
import MockTest from './mockTestModel';

class Discussion extends Model {
  public id!: number;
  public mock_test_id!: string;
  public message!: string;
  public user_id!: string;
  public created_at!: Date;
  public User!: User;
  public MockTest!: MockTest;
}
Discussion.init(
  {
    mock_test_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'discussions',
    createdAt: 'created_at',
    updatedAt: false,
  },
);
Discussion.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
User.hasMany(Discussion, {
  foreignKey: 'user_id',
  sourceKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Discussion.belongsTo(MockTest, {
  foreignKey: 'mock_test_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
MockTest.hasMany(Discussion, {
  foreignKey: 'mock_test_id',
  sourceKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});


export default Discussion;
