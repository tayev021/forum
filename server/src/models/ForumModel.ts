import { DataTypes, Model } from 'sequelize';
import { database } from '../config/database';

export class Forum extends Model {
  public id!: number;
  public authorId!: number | null;
  public categoryId!: number;
  public title!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Forum.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'categories', key: 'id' },
      onDelete: 'CASCADE',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: 'Forum',
    tableName: 'forums',
    timestamps: true,
  }
);
