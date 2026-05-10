import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

export class City extends Model {
  declare id: string;
  declare name: string;
  declare country: string;
  declare region?: string;
  declare costIndex: number;
  declare popularity: number;
  declare description?: string;
  declare imageUrl?: string;
  declare latitude: number;
  declare longitude: number;
}

City.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    costIndex: {
      type: DataTypes.FLOAT,
      defaultValue: 1.0,
    },
    popularity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'City',
    tableName: 'cities',
    timestamps: false,
  }
);
