import { City, Activity } from '../models/index.js';
export declare const searchService: {
    searchCities(query: string, filters?: {
        country?: string;
        region?: string;
    }): Promise<City[]>;
    getCityDetails(cityId: string): Promise<City | null>;
    searchActivities(cityId: string, filters?: {
        type?: string;
        maxCost?: number;
        minRating?: number;
    }): Promise<Activity[]>;
    getPopularCities(): Promise<City[]>;
};
//# sourceMappingURL=searchService.d.ts.map