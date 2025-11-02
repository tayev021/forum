import { DataTypes, Model } from 'sequelize';
import { database } from '../config/database';

export class ErrorLog extends Model {
  public id!: number;
  public message!: string;
  public stack!: string;
}

ErrorLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stack: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: 'ErrorLog',
    tableName: 'error-log',
    timestamps: true,
    updatedAt: false,
  }
);
