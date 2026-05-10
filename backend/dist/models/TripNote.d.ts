import { Model } from 'sequelize';
export declare class TripNote extends Model {
    id: string;
    tripId: string;
    tripStopId?: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=TripNote.d.ts.map