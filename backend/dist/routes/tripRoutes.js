import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { tripService } from '../services/tripService.js';
const router = Router();
// All trip routes are protected
router.use(authMiddleware);
// Trip CRUD
router.post('/', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const { name, description, startDate, endDate, coverPhoto } = req.body;
        if (!name || !startDate || !endDate) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
        const trip = await tripService.createTrip(req.userId, {
            name,
            description,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            coverPhoto,
        });
        res.status(201).json({
            success: true,
            message: 'Trip created successfully',
            data: trip,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create trip',
        });
    }
});
router.get('/', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const trips = await tripService.getUserTrips(req.userId);
        res.status(200).json({
            success: true,
            data: trips,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch trips',
        });
    }
});
router.get('/:tripId', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const trip = await tripService.getTripById(req.params.tripId, req.userId);
        if (!trip) {
            res.status(404).json({ message: 'Trip not found' });
            return;
        }
        res.status(200).json({
            success: true,
            data: trip,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch trip',
        });
    }
});
router.put('/:tripId', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const trip = await tripService.updateTrip(req.params.tripId, req.userId, req.body);
        res.status(200).json({
            success: true,
            message: 'Trip updated successfully',
            data: trip,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to update trip',
        });
    }
});
router.delete('/:tripId', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        await tripService.deleteTrip(req.params.tripId, req.userId);
        res.status(200).json({
            success: true,
            message: 'Trip deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to delete trip',
        });
    }
});
// Trip Stops
router.post('/:tripId/stops', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const { cityId, order, startDate, endDate } = req.body;
        const stop = await tripService.addTripStop(req.params.tripId, req.userId, {
            cityId,
            order,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
        });
        res.status(201).json({
            success: true,
            data: stop,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to add stop',
        });
    }
});
router.delete('/:tripId/stops/:stopId', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        await tripService.removeStopFromTrip(req.params.tripId, req.userId, req.params.stopId);
        res.status(200).json({
            success: true,
            message: 'Stop removed successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to remove stop',
        });
    }
});
router.post('/:tripId/stops/reorder', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const { stopOrders } = req.body;
        await tripService.reorderStops(req.params.tripId, req.userId, stopOrders);
        res.status(200).json({
            success: true,
            message: 'Stops reordered successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to reorder stops',
        });
    }
});
// Activities
router.post('/:tripId/stops/:stopId/activities', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const { activityId, day, notes } = req.body;
        const activity = await tripService.addActivityToStop(req.params.tripId, req.userId, req.params.stopId, { activityId, day, notes });
        res.status(201).json({
            success: true,
            data: activity,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to add activity',
        });
    }
});
router.delete('/:tripId/activities/:activityId', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        await tripService.removeActivityFromStop(req.params.tripId, req.userId, req.params.activityId);
        res.status(200).json({
            success: true,
            message: 'Activity removed successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to remove activity',
        });
    }
});
// Budget
router.get('/:tripId/budget', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const budget = await tripService.getTripBudget(req.params.tripId, req.userId);
        res.status(200).json({
            success: true,
            data: budget,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch budget',
        });
    }
});
export default router;
//# sourceMappingURL=tripRoutes.js.map