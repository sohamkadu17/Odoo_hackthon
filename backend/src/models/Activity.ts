import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import { City } from './City.js';

export enum ActivityType {
  SIGHTSEEING = 'sightseeing',
  FOOD = 'food',
  ADVENTURE = 'adventure',
  CULTURE = 'culture',
  NIGHTLIFE = 'nightlife',
  SHOPPING = 'shopping',
  OTHER = 'other',
}

export class Activity extends Model {
  declare id: string;
  declare cityId: string;
  declare name: string;
  declare description?: string;
  declare type: ActivityType;
  declare cost: number;
  declare duration: number;
  declare rating: number;
  declare imageUrl?: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Activity.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cityId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: City,
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
    type: {
      type: DataTypes.ENUM(...Object.values(ActivityType)),
      defaultValue: ActivityType.OTHER,
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Duration in hours',
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Activity',
    tableName: 'activities',
    timestamps: true,
  }
);

City.hasMany(Activity, { foreignKey: 'cityId' });
Activity.belongsTo(City, { foreignKey: 'cityId' });
