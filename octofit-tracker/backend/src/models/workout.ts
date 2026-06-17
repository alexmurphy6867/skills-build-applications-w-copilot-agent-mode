import { Document, Schema, model } from 'mongoose';

export interface WorkoutDoc extends Document {
    name: string;
    category: string;
    exercises: string[];
    durationMinutes: number;
}

const workoutSchema = new Schema<WorkoutDoc>(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        exercises: { type: [String], required: true },
        durationMinutes: { type: Number, required: true },
    },
    { timestamps: true }
);

export const WorkoutModel = model<WorkoutDoc>('Workout', workoutSchema);
