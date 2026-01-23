import { DataTypes, Model } from 'sequelize';
import { database } from '../config/database';

export class Report extends Model {
  public id!: number;
  public postId!: number;
  public reporterId!: number;
  public reason!: string;
  public createdAt!: Date;
}

Report.init(
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
    reporterId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: 'Report',
    tableName: 'reports',
    timestamps: true,
    updatedAt: false,
    indexes: [
      {
        unique: true,
        fields: ['postId', 'reporterId'],
      },
    ],
  },
);
