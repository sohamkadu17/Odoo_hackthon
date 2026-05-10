import { PackingItem, TripNote } from '../models/index.js';
import { Trip } from '../models/index.js';
export const tripUtilService = {
    // Packing Checklist
    async addPackingItem(tripId, userId, itemData) {
        // Verify trip belongs to user
        const trip = await Trip.findOne({
            where: { id: tripId, userId },
        });
        if (!trip) {
            throw new Error('Trip not found');
        }
        return PackingItem.create({
            tripId,
            ...itemData,
        });
    },
    async getPackingChecklist(tripId, userId) {
        const trip = await Trip.findOne({
            where: { id: tripId, userId },
        });
        if (!trip) {
            throw new Error('Trip not found');
        }
        return PackingItem.findAll({
            where: { tripId },
            order: [['createdAt', 'DESC']],
        });
    },
    async updatePackingItem(tripId, userId, itemId, updates) {
        const trip = await Trip.findOne({
            where: { id: tripId, userId },
        });
        if (!trip) {
            throw new Error('Trip not found');
        }
        await PackingItem.update(updates, {
            where: { id: itemId, tripId },
        });
        return PackingItem.findByPk(itemId);
    },
    async deletePackingItem(tripId, userId, itemId) {
        const trip = await Trip.findOne({
            where: { id: tripId, userId },
        });
        if (!trip) {
            throw new Error('Trip not found');
        }
        await PackingItem.destroy({
            where: { id: itemId, tripId },
        });
    },
    async resetPackingChecklist(tripId, userId) {
        const trip = await Trip.findOne({
            where: { id: tripId, userId },
        });
        if (!trip) {
            throw new Error('Trip not found');
        }
        await PackingItem.update({ isPacked: false }, { where: { tripId } });
    },
    // Trip Notes
    async addTripNote(tripId, userId, noteData) {
        const trip = await Trip.findOne({
            where: { id: tripId, userId },
        });
        if (!trip) {
            throw new Error('Trip not found');
        }
        return TripNote.create({
            tripId,
            ...noteData,
        });
    },
    async getTripNotes(tripId, userId) {
        const trip = await Trip.findOne({
            where: { id: tripId, userId },
        });
        if (!trip) {
            throw new Error('Trip not found');
        }
        return TripNote.findAll({
            where: { tripId },
            order: [['createdAt', 'DESC']],
        });
    },
    async updateTripNote(tripId, userId, noteId, updates) {
        const trip = await Trip.findOne({
            where: { id: tripId, userId },
        });
        if (!trip) {
            throw new Error('Trip not found');
        }
        await TripNote.update(updates, {
            where: { id: noteId, tripId },
        });
        return TripNote.findByPk(noteId);
    },
    async deleteTripNote(tripId, userId, noteId) {
        const trip = await Trip.findOne({
            where: { id: tripId, userId },
        });
        if (!trip) {
            throw new Error('Trip not found');
        }
        await TripNote.destroy({
            where: { id: noteId, tripId },
        });
    },
};
//# sourceMappingURL=tripUtilService.js.map