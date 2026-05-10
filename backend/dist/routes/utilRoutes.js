import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { tripUtilService } from '../services/tripUtilService.js';
const router = Router();
// All routes are protected
router.use(authMiddleware);
// Packing Checklist
router.post('/:tripId/packing', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const { name, category } = req.body;
        if (!name) {
            res.status(400).json({ message: 'Item name is required' });
            return;
        }
        const item = await tripUtilService.addPackingItem(req.params.tripId, req.userId, {
            name,
            category: category || 'other',
        });
        res.status(201).json({
            success: true,
            data: item,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to add packing item',
        });
    }
});
router.get('/:tripId/packing', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const items = await tripUtilService.getPackingChecklist(req.params.tripId, req.userId);
        res.status(200).json({
            success: true,
            data: items,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch packing checklist',
        });
    }
});
router.put('/:tripId/packing/:itemId', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const item = await tripUtilService.updatePackingItem(req.params.tripId, req.userId, req.params.itemId, req.body);
        res.status(200).json({
            success: true,
            data: item,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to update packing item',
        });
    }
});
router.delete('/:tripId/packing/:itemId', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        await tripUtilService.deletePackingItem(req.params.tripId, req.userId, req.params.itemId);
        res.status(200).json({
            success: true,
            message: 'Packing item deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to delete packing item',
        });
    }
});
router.post('/:tripId/packing/reset', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        await tripUtilService.resetPackingChecklist(req.params.tripId, req.userId);
        res.status(200).json({
            success: true,
            message: 'Packing checklist reset successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to reset packing checklist',
        });
    }
});
// Trip Notes
router.post('/:tripId/notes', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const { title, content, tripStopId } = req.body;
        if (!title || !content) {
            res.status(400).json({ message: 'Title and content are required' });
            return;
        }
        const note = await tripUtilService.addTripNote(req.params.tripId, req.userId, {
            title,
            content,
            tripStopId,
        });
        res.status(201).json({
            success: true,
            data: note,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to add note',
        });
    }
});
router.get('/:tripId/notes', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const notes = await tripUtilService.getTripNotes(req.params.tripId, req.userId);
        res.status(200).json({
            success: true,
            data: notes,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch notes',
        });
    }
});
router.put('/:tripId/notes/:noteId', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const note = await tripUtilService.updateTripNote(req.params.tripId, req.userId, req.params.noteId, req.body);
        res.status(200).json({
            success: true,
            data: note,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to update note',
        });
    }
});
router.delete('/:tripId/notes/:noteId', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        await tripUtilService.deleteTripNote(req.params.tripId, req.userId, req.params.noteId);
        res.status(200).json({
            success: true,
            message: 'Note deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to delete note',
        });
    }
});
export default router;
//# sourceMappingURL=utilRoutes.js.map