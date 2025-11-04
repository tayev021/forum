import { DataTypes, Model } from 'sequelize';
import { database } from '../config/database';

export class Post extends Model {
  public id!: number;
  public authorId!: number;
  public threadId!: number;
  public content!: string;
  public createdAt!: string;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: 'Post',
    tableName: 'posts',
    freezeTableName: true,
    timestamps: true,
  }
);
