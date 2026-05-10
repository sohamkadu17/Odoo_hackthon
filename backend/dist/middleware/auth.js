import { verifyToken } from '../utils/jwt.js';
export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }
    try {
        const decoded = verifyToken(token);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
//# sourceMappingURL=auth.js.map