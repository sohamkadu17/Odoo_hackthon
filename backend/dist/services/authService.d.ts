import { User } from '../models/User.js';
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
export declare const authService: {
    signup(payload: SignupPayload): Promise<AuthResponse>;
    login(payload: LoginPayload): Promise<AuthResponse>;
    getUserById(userId: string): Promise<User | null>;
    updateUserProfile(userId: string, updates: Partial<{
        firstName: string;
        lastName: string;
        profilePhoto: string;
        language: string;
    }>): Promise<User | null>;
    deleteAccount(userId: string): Promise<void>;
};
//# sourceMappingURL=authService.d.ts.map