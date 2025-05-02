import { BelongsToManyGetAssociationsMixin, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Course from './courseModels';
import Section from './sectionModel';

class Subject extends Model {
  public id!: number;
  public course_id!: number;
  public title!: string;
  public time_limit!: number;
  public Course?: Course;
  public getSections!: BelongsToManyGetAssociationsMixin<Section>;
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
