import { User } from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';
export const authService = {
    async signup(payload) {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email: payload.email } });
        if (existingUser) {
            throw new Error('Email already registered');
        }
        // Hash password
        const hashedPassword = await hashPassword(payload.password);
        // Create user
        const user = await User.create({
            email: payload.email,
            password: hashedPassword,
            firstName: payload.firstName,
            lastName: payload.lastName,
        });
        // Generate token
        const token = generateToken(user.id);
        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                profilePhoto: user.profilePhoto,
            },
            token,
        };
    },
    async login(payload) {
        // Find user
        const user = await User.findOne({ where: { email: payload.email } });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        // Verify password
        const isPasswordValid = await comparePassword(payload.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        // Generate token
        const token = generateToken(user.id);
        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                profilePhoto: user.profilePhoto,
            },
            token,
        };
    },
    async getUserById(userId) {
        return User.findByPk(userId, {
            attributes: { exclude: ['password'] },
        });
    },
    async updateUserProfile(userId, updates) {
        await User.update(updates, { where: { id: userId } });
        return this.getUserById(userId);
    },
    async deleteAccount(userId) {
        await User.destroy({ where: { id: userId } });
    },
};
//# sourceMappingURL=authService.js.map