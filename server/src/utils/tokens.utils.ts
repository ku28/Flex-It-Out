import jwt from 'jsonwebtoken';
import env from '@/config/validateEnv.config.js';
import ms from "ms";

export interface CookiePayload {
    _id: string;
    email: string;
}

export const generateToken = (payload: CookiePayload): string => {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.tokenExpiration as
            | number
            | ms.StringValue
            | undefined,
    });
};

export const checkToken = (token: string): CookiePayload => {
    return jwt.verify(token, env.JWT_SECRET) as CookiePayload;
};