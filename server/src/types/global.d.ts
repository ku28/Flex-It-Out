import { UserDocument } from '@/models/user.model.ts';

declare global {
    namespace Express {
        interface Request {
            user?: Partial<UserDocument>;
        }
    }
}