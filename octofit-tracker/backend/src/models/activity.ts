import { Document, Schema, model } from 'mongoose';

export interface ActivityDoc extends Document {
    userId: string;
    type: string;
    duration: number;
    distanceKm?: number;
    date: Date;
}

const activitySchema = new Schema<ActivityDoc>(
    {
        userId: { type: String, required: true },
        type: { type: String, required: true },
        duration: { type: Number, required: true },
        distanceKm: { type: Number, required: false },
        date: { type: Date, required: true, default: () => new Date() },
    },
    { timestamps: true }
);

export const ActivityModel = model<ActivityDoc>('Activity', activitySchema);
