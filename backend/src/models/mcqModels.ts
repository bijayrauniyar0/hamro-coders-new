import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Subject from './subjectsModels';

class MCQ extends Model {
  public id!: number;
  public question!: string;
  public subject_id!: string;
  public options!: JSON;
  public answer!: string;
  public Subject?: Subject;
}

MCQ.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    options: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'mcq_questions',
    sequelize,
    timestamps: false,
  },
);

Subject.hasMany(MCQ, {
  foreignKey: 'subject_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

MCQ.belongsTo(Subject, {
  foreignKey: 'subject_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default MCQ;
