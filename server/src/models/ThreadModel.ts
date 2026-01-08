import { DataTypes, Model } from 'sequelize';
import { database } from '../config/database';

export class Thread extends Model {
  public id!: number;
  public authorId!: number | null;
  public forumId!: number;
  public title!: string;
  public views!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Thread.init(
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
    forumId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'forums', key: 'id' },
      onDelete: 'CASCADE',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize: database,
    modelName: 'Thread',
    tableName: 'threads',
    timestamps: true,
  }
);
