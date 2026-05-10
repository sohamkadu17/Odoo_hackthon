import { Trip, TripStop, StopActivity } from '../models/index.js';
export declare const tripService: {
    createTrip(userId: string, tripData: {
        name: string;
        description?: string;
        startDate: Date;
        endDate: Date;
        coverPhoto?: string;
    }): Promise<Trip>;
    getUserTrips(userId: string): Promise<Trip[]>;
    getTripById(tripId: string, userId: string): Promise<Trip | null>;
    updateTrip(tripId: string, userId: string, updates: Partial<{
        name: string;
        description: string;
        startDate: Date;
        endDate: Date;
        coverPhoto: string;
        isPublic: boolean;
    }>): Promise<Trip | null>;
    deleteTrip(tripId: string, userId: string): Promise<void>;
    addTripStop(tripId: string, userId: string, stopData: {
        cityId: string;
        order: number;
        startDate: Date;
        endDate: Date;
    }): Promise<TripStop>;
    removeStopFromTrip(tripId: string, userId: string, stopId: string): Promise<void>;
    reorderStops(tripId: string, userId: string, stopOrders: {
        stopId: string;
        order: number;
    }[]): Promise<void>;
    addActivityToStop(tripId: string, userId: string, stopId: string, activityData: {
        activityId: string;
        day: number;
        notes?: string;
    }): Promise<StopActivity>;
    removeActivityFromStop(tripId: string, userId: string, stopActivityId: string): Promise<void>;
    getTripBudget(tripId: string, userId: string): Promise<{
        totalCost: number;
        breakdown: {
            [key: string]: number;
        };
        averageCostPerDay: number;
        tripDays: number;
    }>;
    getPublicTrip(tripId: string): Promise<Trip | null>;
};
//# sourceMappingURL=tripService.d.ts.map