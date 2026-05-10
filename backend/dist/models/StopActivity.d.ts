import { Model } from 'sequelize';
export declare class StopActivity extends Model {
    id: string;
    tripStopId: string;
    activityId: string;
    day: number;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=StopActivity.d.ts.map