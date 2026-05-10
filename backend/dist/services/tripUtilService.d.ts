import { PackingItem, TripNote } from '../models/index.js';
export declare const tripUtilService: {
    addPackingItem(tripId: string, userId: string, itemData: {
        name: string;
        category: string;
    }): Promise<PackingItem>;
    getPackingChecklist(tripId: string, userId: string): Promise<PackingItem[]>;
    updatePackingItem(tripId: string, userId: string, itemId: string, updates: {
        name?: string;
        category?: string;
        isPacked?: boolean;
    }): Promise<PackingItem | null>;
    deletePackingItem(tripId: string, userId: string, itemId: string): Promise<void>;
    resetPackingChecklist(tripId: string, userId: string): Promise<void>;
    addTripNote(tripId: string, userId: string, noteData: {
        title: string;
        content: string;
        tripStopId?: string;
    }): Promise<TripNote>;
    getTripNotes(tripId: string, userId: string): Promise<TripNote[]>;
    updateTripNote(tripId: string, userId: string, noteId: string, updates: {
        title?: string;
        content?: string;
    }): Promise<TripNote | null>;
    deleteTripNote(tripId: string, userId: string, noteId: string): Promise<void>;
};
//# sourceMappingURL=tripUtilService.d.ts.map