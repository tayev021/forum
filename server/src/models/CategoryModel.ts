import { DataTypes, Model } from 'sequelize';
import { database } from '../config/database';

export class Category extends Model {
  public id!: number;
  public authorId!: number | null;
  public title!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
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
      allowNull: true,
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
