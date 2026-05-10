import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import { TripStop } from './TripStop.js';
import { Activity } from './Activity.js';
export class StopActivity extends Model {
}
StopActivity.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    tripStopId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: TripStop,
            key: 'id',
        },
    },
    activityId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Activity,
            key: 'id',
        },
    },
    day: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'StopActivity',
    tableName: 'stop_activities',
    timestamps: true,
});
TripStop.hasMany(StopActivity, { foreignKey: 'tripStopId' });
StopActivity.belongsTo(TripStop, { foreignKey: 'tripStopId' });
Activity.hasMany(StopActivity, { foreignKey: 'activityId' });
StopActivity.belongsTo(Activity, { foreignKey: 'activityId' });
//# sourceMappingURL=StopActivity.js.map