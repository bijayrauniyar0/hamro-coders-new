// src/models/userModel.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

// Define the User model
class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public number!: string;
  public avatar!: string;
  public verified!: boolean;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'bear',
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  },
);

export default User;
