import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Stream extends Model {
  public id!: number;
  public name!: string;
}

Stream.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'streams',
    sequelize,
    timestamps: false,
  },
);
export default Stream;
