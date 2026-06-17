import { Document, Schema, model } from 'mongoose';

export interface TeamDoc extends Document {
    name: string;
    description: string;
    createdAt: Date;
}

const teamSchema = new Schema<TeamDoc>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        createdAt: { type: Date, required: true, default: () => new Date() },
    },
    { timestamps: true }
);

export const TeamModel = model<TeamDoc>('Team', teamSchema);
