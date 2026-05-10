import { Model } from 'sequelize';
export declare class TripStop extends Model {
    id: string;
    tripId: string;
    cityId: string;
    order: number;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=TripStop.d.ts.map