import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Course extends Model {
  public id!: number;
  public course_name!: string;
}

Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    course_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'courses',
    sequelize,
    timestamps: false,
  },
);

export default Course;
