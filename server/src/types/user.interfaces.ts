export interface IUser {
    email: string;
    password?: string;
    isGuest: boolean;
    googleId?: string;
    name?: string;
    createdAt: Date;
    role: 'admin' | 'user';
}

export interface AuthRequest {
    email: string;
    password?: string;
    isGuest?: boolean;
    googleId?: string;
    name?: string;
}