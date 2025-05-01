import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Subject from './subjectsModel';
import Section from './sectionModel';

class SubjectSectionLink extends Model {
  public subject_id!: number;
  public section_id!: number;
}

SubjectSectionLink.init(
  {
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subjects', // Reference to the Subjects table
        key: 'id',
      },
    },
    section_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sections', // Reference to the Sections table
        key: 'id',
      },
    },
  },
  {
    tableName: 'subject_section_links',
    sequelize,
    timestamps: false,
  },
);

// Setting up the many-to-many relationship
Subject.belongsToMany(Section, {
  through: SubjectSectionLink,
  foreignKey: 'subject_id',
  otherKey: 'section_id',
});

Section.belongsToMany(Subject, {
  through: SubjectSectionLink,
  foreignKey: 'section_id',
  otherKey: 'subject_id',
});

export default SubjectSectionLink;
