import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class GoogleAuthToken extends Model {
  public id!: number;
  public refresh_token!: string;
  public access_token!: string;
  public access_token_expires_at!: Date;
}

GoogleAuthToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    access_token: {
      type: DataTypes.TEXT,
    },
    access_token_expires_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: 'google_auth_tokens',
    timestamps: false,
  },
);
