import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Test from './mockTestModel';
import Section from './sectionModel';

class TestSectionLink extends Model {
  public test_id!: number;
  public section_id!: number;
}

TestSectionLink.init(
  {
    mock_test_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mock_tests', // Reference to the Tests table
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
    tableName: 'test_section_links',
    sequelize,
    timestamps: false,
  },
);

// Setting up the many-to-many relationship
Test.belongsToMany(Section, {
  through: TestSectionLink,
  foreignKey: 'mock_test_id',
  otherKey: 'section_id',
});

Section.belongsToMany(Test, {
  through: TestSectionLink,
  foreignKey: 'section_id',
  otherKey: 'test_id',
});

export default TestSectionLink;
