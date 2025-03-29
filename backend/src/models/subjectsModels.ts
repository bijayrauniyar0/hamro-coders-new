import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Course from './courseModels';

class Subject extends Model {
  public id!: number;
  public course_id!: number;
  public title!: string;
  public marks!: number;
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration_in_minutes: {
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
