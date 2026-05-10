import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import { User } from './User.js';

export class Trip extends Model {
  declare id: string;
  declare userId: string;
  declare name: string;
  declare description?: string;
  declare startDate: Date;
  declare endDate: Date;
  declare coverPhoto?: string;
  declare isPublic: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Trip.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    coverPhoto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Trip',
    tableName: 'trips',
    timestamps: true,
  }
);

User.hasMany(Trip, { foreignKey: 'userId' });
Trip.belongsTo(User, { foreignKey: 'userId' });
