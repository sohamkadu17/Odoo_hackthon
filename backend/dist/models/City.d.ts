import { Model } from 'sequelize';
export declare class City extends Model {
    id: string;
    name: string;
    country: string;
    region?: string;
    costIndex: number;
    popularity: number;
    description?: string;
    imageUrl?: string;
    latitude: number;
    longitude: number;
}
//# sourceMappingURL=City.d.ts.map