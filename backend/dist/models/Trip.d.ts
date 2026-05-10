import { Model } from 'sequelize';
export declare class Trip extends Model {
    id: string;
    userId: string;
    name: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    coverPhoto?: string;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=Trip.d.ts.map