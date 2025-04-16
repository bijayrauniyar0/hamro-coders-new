import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './userModels';

class Notification extends Model {
  public id!: number;
  public user_id!: string;
  public message!: string;
  public is_read!: boolean;
}

Notification.init(
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
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'notifications',
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  },
);

User.hasMany(Notification, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Notification.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default Notification;
