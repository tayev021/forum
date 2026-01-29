import { DataTypes, Model } from 'sequelize';
import { AttachmentType } from '../types/AttachmentType';
import { database } from '../config/database';

export class Attachment extends Model {
  public id!: number;
  public postId!: number;
  public type!: AttachmentType;
  public fileName!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Attachment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'posts', key: 'id' },
      onDelete: 'CASCADE',
    },
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['image'],
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: 'Attachment',
    tableName: 'attachments',
    timestamps: true,
  }
);
