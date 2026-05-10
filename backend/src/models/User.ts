import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

export class User extends Model {
  declare id: string;
  declare email: string;
  declare password: string;
  declare firstName: string;
  declare lastName: string;
  declare profilePhoto?: string;
  declare language: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(191),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePhoto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    language: {
      type: DataTypes.STRING,
      defaultValue: 'en',
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);
