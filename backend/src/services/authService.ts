import { User } from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

export interface SignupPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePhoto?: string;
  };
  token: string;
}

export const authService = {
  async signup(payload: SignupPayload): Promise<AuthResponse> {
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

  async login(payload: LoginPayload): Promise<AuthResponse> {
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

  async getUserById(userId: string) {
    return User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });
  },

  async updateUserProfile(
    userId: string,
    updates: Partial<{
      firstName: string;
      lastName: string;
      profilePhoto: string;
      language: string;
    }>
  ) {
    await User.update(updates, { where: { id: userId } });
    return this.getUserById(userId);
  },

  async deleteAccount(userId: string) {
    await User.destroy({ where: { id: userId } });
  },
};
