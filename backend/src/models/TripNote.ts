import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import { Trip } from './Trip.js';
import { TripStop } from './TripStop.js';

export class TripNote extends Model {
  declare id: string;
  declare tripId: string;
  declare tripStopId?: string;
  declare title: string;
  declare content: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

TripNote.init(
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
    tripStopId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: TripStop,
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'TripNote',
    tableName: 'trip_notes',
    timestamps: true,
  }
);

Trip.hasMany(TripNote, { foreignKey: 'tripId' });
TripNote.belongsTo(Trip, { foreignKey: 'tripId' });
TripStop.hasMany(TripNote, { foreignKey: 'tripStopId' });
TripNote.belongsTo(TripStop, { foreignKey: 'tripStopId' });
