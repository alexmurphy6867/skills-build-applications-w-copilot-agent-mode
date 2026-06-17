import { Document, Schema, model } from 'mongoose';

export interface LeaderboardDoc extends Document {
    userId: string;
    score: number;
    rank: number;
}

const leaderboardSchema = new Schema<LeaderboardDoc>(
    {
        userId: { type: String, required: true },
        score: { type: Number, required: true },
        rank: { type: Number, required: true },
    },
    { timestamps: true }
);

export const LeaderboardModel = model<LeaderboardDoc>('Leaderboard', leaderboardSchema);
