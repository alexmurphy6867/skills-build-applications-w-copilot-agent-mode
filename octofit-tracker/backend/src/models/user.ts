import { Document, Schema, model } from 'mongoose';

export interface UserDoc extends Document {
    name: string;
    email: string;
    role: 'user' | 'coach' | 'admin';
    joinedAt: Date;
    teamId?: string;
}

const userSchema = new Schema<UserDoc>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        role: { type: String, required: true, enum: ['user', 'coach', 'admin'], default: 'user' },
        joinedAt: { type: Date, required: true, default: () => new Date() },
        teamId: { type: String, required: false },
    },
    { timestamps: true }
);

export const UserModel = model<UserDoc>('User', userSchema);
