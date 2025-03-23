import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Course from './courseModels';

class Subject extends Model {
  public id!: number;
  course_id!: number;
  public subject_code!: string;
  public subject_title!: string;
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
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subject_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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

Course.hasMany(Subject, {
  foreignKey: 'course_id',
  sourceKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Subject.belongsTo(Course, {
  foreignKey: 'course_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default Subject;
