import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';
const router = Router();
// Public routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
// Protected routes
router.get('/profile', authMiddleware, authController.getProfile);
router.put('/profile', authMiddleware, authController.updateProfile);
router.delete('/account', authMiddleware, authController.deleteAccount);
export default router;
//# sourceMappingURL=authRoutes.js.map