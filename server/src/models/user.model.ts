import { Model, Document, Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '@/types/user.interfaces.js';

export interface UserDocument extends IUser, Document {
    _id: string;
    comparePassword(password: string): Promise<boolean>;
}

interface UserModel extends Model<UserDocument> {
    findByEmail(email: string): Promise<UserDocument | null>;
}

const userSchema = new Schema<UserDocument>({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: function (this: UserDocument) {
            return !this.isGuest;
        },
    },
    isGuest: {
        type: Boolean,
        default: false,
    },
    googleId: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
}, {
    timestamps: true,
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password') && this.password) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function (
    password: string
): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

userSchema.statics.findByEmail = function (
    email: string
): Promise<UserDocument | null> {
    return this.findOne({ email });
};

export const User = model<UserDocument, UserModel>('User', userSchema);
