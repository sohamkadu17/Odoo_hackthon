import { authService } from '../services/authService.js';
export const authController = {
    async signup(req, res) {
        try {
            const { email, password, firstName, lastName } = req.body;
            // Validation
            if (!email || !password || !firstName || !lastName) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }
            if (password.length < 6) {
                res.status(400).json({ message: 'Password must be at least 6 characters' });
                return;
            }
            const result = await authService.signup({
                email,
                password,
                firstName,
                lastName,
            });
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: result,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message || 'Signup failed',
            });
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;
            // Validation
            if (!email || !password) {
                res.status(400).json({ message: 'Email and password are required' });
                return;
            }
            const result = await authService.login({ email, password });
            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result,
            });
        }
        catch (error) {
            res.status(401).json({
                success: false,
                message: error.message || 'Login failed',
            });
        }
    },
    async getProfile(req, res) {
        try {
            if (!req.userId) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }
            const user = await authService.getUserById(req.userId);
            res.status(200).json({
                success: true,
                data: user,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message || 'Failed to fetch profile',
            });
        }
    },
    async updateProfile(req, res) {
        try {
            if (!req.userId) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }
            const { firstName, lastName, profilePhoto, language } = req.body;
            const updates = {};
            if (firstName)
                updates.firstName = firstName;
            if (lastName)
                updates.lastName = lastName;
            if (profilePhoto)
                updates.profilePhoto = profilePhoto;
            if (language)
                updates.language = language;
            const user = await authService.updateUserProfile(req.userId, updates);
            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                data: user,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message || 'Failed to update profile',
            });
        }
    },
    async deleteAccount(req, res) {
        try {
            if (!req.userId) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }
            await authService.deleteAccount(req.userId);
            res.status(200).json({
                success: true,
                message: 'Account deleted successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message || 'Failed to delete account',
            });
        }
    },
};
//# sourceMappingURL=authController.js.map