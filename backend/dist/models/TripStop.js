import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import { Trip } from './Trip.js';
import { City } from './City.js';
export class TripStop extends Model {
}
TripStop.init({
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
    cityId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: City,
            key: 'id',
        },
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'TripStop',
    tableName: 'trip_stops',
    timestamps: true,
});
Trip.hasMany(TripStop, { foreignKey: 'tripId' });
TripStop.belongsTo(Trip, { foreignKey: 'tripId' });
City.hasMany(TripStop, { foreignKey: 'cityId' });
TripStop.belongsTo(City, { foreignKey: 'cityId' });
//# sourceMappingURL=TripStop.js.map