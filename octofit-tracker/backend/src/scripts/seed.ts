import mongoose from 'mongoose';
import { ActivityModel } from '../models/activity.js';
import { LeaderboardModel } from '../models/leaderboard.js';
import { TeamModel } from '../models/team.js';
import { UserModel } from '../models/user.js';
import { WorkoutModel } from '../models/workout.js';

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');

    await mongoose.connect(mongoUri);

    await Promise.all([
        UserModel.deleteMany({}),
        TeamModel.deleteMany({}),
        ActivityModel.deleteMany({}),
        WorkoutModel.deleteMany({}),
        LeaderboardModel.deleteMany({}),
    ]);

    const teams = await TeamModel.create([
        { name: 'OctoFit Champions', description: 'Performance-driven training squad' },
        { name: 'Morning Movers', description: 'Early risers staying active' },
    ]);

    const users = await UserModel.create([
        { name: 'Ari Jones', email: 'ari@example.com', role: 'coach', teamId: teams[0].id },
        { name: 'Mina Park', email: 'mina@example.com', role: 'user', teamId: teams[0].id },
        { name: 'Noah Patel', email: 'noah@example.com', role: 'user', teamId: teams[1].id },
    ]);

    const workouts = await WorkoutModel.create([
        { name: 'Morning Mobility', category: 'flexibility', exercises: ['Sun Salutation', 'Hip Openers', 'Cat-Cow'], durationMinutes: 20 },
        { name: 'Power Circuit', category: 'strength', exercises: ['Push-ups', 'Jump Squats', 'Plank'], durationMinutes: 30 },
    ]);

    const activities = await ActivityModel.create([
        { userId: users[1].id, type: 'run', duration: 35, distanceKm: 5.2, date: new Date('2026-06-15T07:30:00Z') },
        { userId: users[2].id, type: 'strength', duration: 45, date: new Date('2026-06-15T18:00:00Z') },
    ]);

    await LeaderboardModel.create([
        { userId: users[1].id, score: 1180, rank: 1 },
        { userId: users[2].id, score: 1120, rank: 2 },
    ]);

    console.log('Seed completed:', {
        users: users.length,
        teams: teams.length,
        workouts: workouts.length,
        activities: activities.length,
    });

    await mongoose.disconnect();
}

seedDatabase()
    .then(() => {
        console.log('Database seeding finished successfully.');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Seed script failed:', error);
        process.exit(1);
    });
