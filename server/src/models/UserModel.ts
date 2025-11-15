import { DataTypes, Model } from 'sequelize';
import { database } from '../config/database';

type UserRole = 'user' | 'moderator' | 'admin';

export class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public avatar!: string;
  public role!: UserRole;
  public lastSignIn!: Date;
  public createdAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'moderator', 'admin'],
      defaultValue: 'user',
    },
    lastSignIn: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: database,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);
