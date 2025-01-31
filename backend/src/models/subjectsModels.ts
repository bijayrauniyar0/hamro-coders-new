import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Subject extends Model {
  public subject_code!: string;
  public title!: string;
  public semester!: number;
  public course_name!: string;
}

Subject.init(
  {
    subject_code: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    course_name: {
      type: DataTypes.STRING,
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
