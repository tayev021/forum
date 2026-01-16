import { DataTypes, Model } from 'sequelize';
import { database } from '../config/database';

export class Like extends Model {
  public id!: number;
  public userId!: number;
  public postId!: number;
  public createdAt!: Date;
}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'posts', key: 'id' },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize: database,
    modelName: 'Like',
    tableName: 'likes',
    timestamps: true,
    updatedAt: false,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'postId'],
      },
    ],
  }
);
