import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Course from './courseModels';

class Subject extends Model {
  public id!: number;
  public course_id!: number;
  public title!: string;
  public marks!: number;
  public duration_in_minutes!: number;
  public questions_count!: number;
  public marks_per_question!: number;
  public negative_marking!: number;
  public total_marks!: number;
  public time_limit!: number;
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
    time_limit: {
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

Subject.belongsTo(Course, {
  foreignKey: 'course_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Course.hasMany(Subject, {
  foreignKey: 'course_id',
  sourceKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default Subject;
