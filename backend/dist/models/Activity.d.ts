import { Model } from 'sequelize';
export declare enum ActivityType {
    SIGHTSEEING = "sightseeing",
    FOOD = "food",
    ADVENTURE = "adventure",
    CULTURE = "culture",
    NIGHTLIFE = "nightlife",
    SHOPPING = "shopping",
    OTHER = "other"
}
export declare class Activity extends Model {
    id: string;
    cityId: string;
    name: string;
    description?: string;
    type: ActivityType;
    cost: number;
    duration: number;
    rating: number;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=Activity.d.ts.map