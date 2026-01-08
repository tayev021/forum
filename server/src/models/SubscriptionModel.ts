import { DataTypes, Model } from 'sequelize';
import { database } from '../config/database';

export class Subscription extends Model {
  public id!: number;
  public userId!: number;
  public threadId!: number;
  public lastReadAt!: Date;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Subscription.init(
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
    threadId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'threads', key: 'id' },
      onDelete: 'CASCADE',
    },
    lastReadAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: database,
    modelName: 'Subscription',
    tableName: 'subscriptions',
    timestamps: true,
  }
);
