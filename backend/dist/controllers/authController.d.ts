import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
export declare const authController: {
    signup(req: AuthRequest, res: Response): Promise<void>;
    login(req: AuthRequest, res: Response): Promise<void>;
    getProfile(req: AuthRequest, res: Response): Promise<void>;
    updateProfile(req: AuthRequest, res: Response): Promise<void>;
    deleteAccount(req: AuthRequest, res: Response): Promise<void>;
};
//# sourceMappingURL=authController.d.ts.map