import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import { Trip } from './Trip.js';

export enum ItemCategory {
  CLOTHING = 'clothing',
  DOCUMENTS = 'documents',
  ELECTRONICS = 'electronics',
  TOILETRIES = 'toiletries',
  MEDICATIONS = 'medications',
  OTHER = 'other',
}

export class PackingItem extends Model {
  declare id: string;
  declare tripId: string;
  declare name: string;
  declare category: ItemCategory;
  declare isPacked: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
}

PackingItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tripId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Trip,
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(...Object.values(ItemCategory)),
      defaultValue: ItemCategory.OTHER,
    },
    isPacked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'PackingItem',
    tableName: 'packing_items',
    timestamps: true,
  }
);

Trip.hasMany(PackingItem, { foreignKey: 'tripId' });
PackingItem.belongsTo(Trip, { foreignKey: 'tripId' });
