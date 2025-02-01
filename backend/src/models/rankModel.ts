import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './userModels';

class Rank extends Model {
  public id!: number;
  public user_id!: number;
  public score!: number;
  public user_score_id!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Rank.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'rank',
    sequelize,
    timestamps: true, // Enables timestamps
    createdAt: 'created_at', // Rename createdAt column
    updatedAt: 'updated_at', // Rename updatedAt column
  },
);

User.hasMany(Rank, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Rank.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
export default Rank;
