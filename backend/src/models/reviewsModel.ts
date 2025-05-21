import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './userModels';
import MockTest from './mockTestModel';

class Review extends Model {
  public id!: number;
  public review!: string;
  public rating!: number;
  public User!: User;
  public MockTest!: MockTest;
}

Review.init(
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
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 5,
      },
    },
  },
  {
    tableName: 'reviews',
    sequelize,
    createdAt: 'created_at',
    updatedAt: false,
  },
);
Review.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Review.belongsTo(MockTest, {
  foreignKey: 'mock_test_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
// Define associations
User.hasMany(Review, {
  foreignKey: 'user_id',
  sourceKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
MockTest.hasMany(Review, {
  foreignKey: 'mock_test_id',
  sourceKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default Review;
