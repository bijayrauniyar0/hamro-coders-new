import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './userModels';
import MockTest from './mockTestModel';

class Bookmark extends Model {
  public id!: number;
  public user_id!: number;
  public mock_test_id!: number;
  public MockTest!: MockTest;
  public User!: User;
}

Bookmark.init(
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
  },
  {
    tableName: 'bookmarks',
    sequelize,
    timestamps: false,
  },
);

// Associations
Bookmark.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Bookmark.belongsTo(MockTest, {
  foreignKey: 'mock_test_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

User.hasMany(Bookmark, {
  foreignKey: 'user_id',
  sourceKey: 'id',
});

MockTest.hasMany(Bookmark, {
  foreignKey: 'mock_test_id',
  sourceKey: 'id',
});

export default Bookmark;
