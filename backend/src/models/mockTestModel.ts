import { BelongsToManyGetAssociationsMixin, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Section from './sectionModel';
import Stream from './streamModels';

class MockTest extends Model {
  public id!: number;
  public stream_id!: number;
  public title!: string;
  public time_limit!: number;
  public Stream!: Stream;
  public getSections!: BelongsToManyGetAssociationsMixin<Section>;
}

MockTest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    stream_id: {
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
    tableName: 'mock_tests',
    sequelize,
    timestamps: false,
  },
);

MockTest.belongsTo(Stream, {
  foreignKey: 'stream_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Stream.hasMany(MockTest, {
  foreignKey: 'stream_id',
  sourceKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default MockTest;
