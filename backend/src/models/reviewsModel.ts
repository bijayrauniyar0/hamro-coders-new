import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Review extends Model {
  public id!: number;
  public full_name!: string;
  public email!: string;
  public review!: string;
  public exam_type!: string;
  public rating!: number;
  public profile_photo?: string;
  public anonymous!: boolean;
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    exam_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 5,
      },
    },
    anonymous: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    profile_photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'reviews',
    sequelize,
    createdAt: 'created_at',
    updatedAt: false,
  },
);

export default Review;
