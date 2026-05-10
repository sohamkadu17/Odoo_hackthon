import { Trip, TripStop, City, StopActivity, Activity, PackingItem, TripNote } from '../models/index.js';
export const tripService = {
    async createTrip(userId, tripData) {
        return Trip.create({
            userId,
            ...tripData,
        });
    },
    async getUserTrips(userId) {
        return Trip.findAll({
            where: { userId },
            include: [
                {
                    model: TripStop,
                    include: [City],
                },
            ],
            order: [['createdAt', 'DESC']],
        });
    },
    async getTripById(tripId, userId) {
        return Trip.findOne({
            where: { id: tripId, userId },
            include: [
                {
                    model: TripStop,
                    include: [
                        City,
                        {
                            model: StopActivity,
                            include: [Activity],
                        },
                    ],
                },
                PackingItem,
                TripNote,
            ],
        });
    },
    async updateTrip(tripId, userId, updates) {
        await Trip.update(updates, {
            where: { id: tripId, userId },
        });
        return this.getTripById(tripId, userId);
    },
    async deleteTrip(tripId, userId) {
        await Trip.destroy({
            where: { id: tripId, userId },
        });
    },
    async addTripStop(tripId, userId, stopData) {
        // Verify trip belongs to user
        const trip = await Trip.findOne({
            where: { id: tripId, userId },
        });
        if (!trip) {
            throw new Error('Trip not found');
        }
        return TripStop.create({
            tripId,
            ...stopData,
        });
    },
    async removeStopFromTrip(tripId, userId, stopId) {
        const trip = await Trip.findOne({
            where: { id: tripId, userId },
        });
        if (!trip) {
            throw new Error('Trip not found');
        }
        await TripStop.destroy({
            where: { id: stopId, tripId },
        });
    },
    async reorderStops(tripId, userId, stopOrders) {
        const trip = await Trip.findOne({
            where: { id: tripId, userId },
        });
        if (!trip) {
            throw new Error('Trip not found');
        }
        for (const { stopId, order } of stopOrders) {
            await TripStop.update({ order }, { where: { id: stopId, tripId } });
        }
    },
    async addActivityToStop(tripId, userId, stopId, activityData) {
        const trip = await Trip.findOne({
            where: { id: tripId, userId },
        });
        if (!trip) {
            throw new Error('Trip not found');
        }
        return StopActivity.create({
            tripStopId: stopId,
            ...activityData,
        });
    },
    async removeActivityFromStop(tripId, userId, stopActivityId) {
        const trip = await Trip.findOne({
            where: { id: tripId, userId },
        });
        if (!trip) {
            throw new Error('Trip not found');
        }
        await StopActivity.destroy({
            where: { id: stopActivityId },
        });
    },
    async getTripBudget(tripId, userId) {
        const trip = await Trip.findOne({
            where: { id: tripId, userId },
            include: [
                {
                    model: TripStop,
                    include: [
                        {
                            model: StopActivity,
                            include: [Activity],
                        },
                    ],
                },
            ],
        });
        if (!trip) {
            throw new Error('Trip not found');
        }
        let totalCost = 0;
        const breakdown = {
            activities: 0,
            accommodation: 0,
            transport: 0,
        };
        if (trip.TripStops) {
            for (const stop of trip.TripStops) {
                if (stop.StopActivities) {
                    for (const activity of stop.StopActivities) {
                        breakdown.activities += activity.Activity.cost;
                        totalCost += activity.Activity.cost;
                    }
                }
            }
        }
        const days = Math.ceil((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24));
        return {
            totalCost,
            breakdown,
            averageCostPerDay: totalCost / (days || 1),
            tripDays: days,
        };
    },
    async getPublicTrip(tripId) {
        return Trip.findOne({
            where: { id: tripId, isPublic: true },
            include: [
                {
                    model: TripStop,
                    include: [
                        City,
                        {
                            model: StopActivity,
                            include: [Activity],
                        },
                    ],
                },
            ],
            attributes: { exclude: ['userId'] },
        });
    },
};
//# sourceMappingURL=tripService.js.map