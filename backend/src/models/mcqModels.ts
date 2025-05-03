import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Subject from './subjectsModel';
import Section from './sectionModel';

class MCQ extends Model {
  public id!: number;
  public question!: string;
  public section_id!: string;
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
    section_id: {
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

Section.hasMany(MCQ, {
  foreignKey: 'section_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

MCQ.belongsTo(Section, {
  foreignKey: 'section_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default MCQ;
