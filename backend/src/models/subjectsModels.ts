import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Subject extends Model {
  public id!: number;
  public subject_code!: string;
  public subject_title!: string;
  public course_name!: string;
  public full_marks!: number;
  public duration!: number;
}

Subject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subject_code: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    subject_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    full_marks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'subjects',
    sequelize,
    timestamps: false,
  },
);

export default Subject;
