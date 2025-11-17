import { DataTypes, Model } from 'sequelize';
import { database } from '../config/database';

export class Category extends Model {
  public id!: number;
  public authorId!: number;
  public title!: string;
  public createdAt!: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true,
  }
);
