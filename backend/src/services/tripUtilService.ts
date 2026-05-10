import { PackingItem, TripNote } from '../models/index.js';
import { Trip } from '../models/index.js';

export const tripUtilService = {
  // Packing Checklist
  async addPackingItem(
    tripId: string,
    userId: string,
    itemData: {
      name: string;
      category: string;
    }
  ) {
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

  async getPackingChecklist(tripId: string, userId: string) {
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

  async updatePackingItem(
    tripId: string,
    userId: string,
    itemId: string,
    updates: { name?: string; category?: string; isPacked?: boolean }
  ) {
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

  async deletePackingItem(tripId: string, userId: string, itemId: string) {
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

  async resetPackingChecklist(tripId: string, userId: string) {
    const trip = await Trip.findOne({
      where: { id: tripId, userId },
    });

    if (!trip) {
      throw new Error('Trip not found');
    }

    await PackingItem.update(
      { isPacked: false },
      { where: { tripId } }
    );
  },

  // Trip Notes
  async addTripNote(
    tripId: string,
    userId: string,
    noteData: {
      title: string;
      content: string;
      tripStopId?: string;
    }
  ) {
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

  async getTripNotes(tripId: string, userId: string) {
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

  async updateTripNote(
    tripId: string,
    userId: string,
    noteId: string,
    updates: { title?: string; content?: string }
  ) {
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

  async deleteTripNote(tripId: string, userId: string, noteId: string) {
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
