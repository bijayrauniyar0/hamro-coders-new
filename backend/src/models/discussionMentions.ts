// src/models/messageModel.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './userModels';
import Discussion from './discussionModel';

class DiscussionMentions extends Model {
  public id!: number;
  public message_id!: number;
  public user_id!: string;
  public User!: User;
  public Discussion!: Discussion;
  public created_at!: Date;
}

DiscussionMentions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    message_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'discussion_mentions',
    createdAt: 'created_at',
    updatedAt: false,
  },
);
DiscussionMentions.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
User.hasMany(DiscussionMentions, {
  foreignKey: 'user_id',
  sourceKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
DiscussionMentions.belongsTo(Discussion, {
  foreignKey: 'message_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Discussion.hasMany(DiscussionMentions, {
  foreignKey: 'message_id',
  sourceKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default DiscussionMentions;
