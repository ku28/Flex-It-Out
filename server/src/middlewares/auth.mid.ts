import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from '@/config/validateEnv.config.js';
import { CookiePayload } from '@/utils/tokens.utils.js';

export const checkAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req?.header('Authorization')?.replace('Bearer ', '') || req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Please authenticate" });
        }

        const decoded = jwt.verify(
            token,
            env.JWT_SECRET
        ) as CookiePayload;

        req.user = {
            _id: decoded?._id,
            email: decoded?.email,
        };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};
