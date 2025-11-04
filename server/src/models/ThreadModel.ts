import { DataTypes, Model } from 'sequelize';
import { database } from '../config/database';

export class Thread extends Model {
  public id!: number;
  public authorId!: number;
  public title!: string;
  public createdAt!: string;
}

Thread.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: 'Thread',
    tableName: 'threads',
    timestamps: true,
  }
);
