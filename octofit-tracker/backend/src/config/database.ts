import mongoose from 'mongoose';

mongoose.set('bufferCommands', false);

export const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export function connectDatabase() {
    return mongoose.connect(mongoUri);
}

export function disconnectDatabase() {
    return mongoose.disconnect();
}

export { mongoose };

