import cors from 'cors';
import express from 'express';
import { connectDatabase, mongoUri } from './config/database.js';
import { ActivityModel } from './models/activity.js';
import { LeaderboardModel } from './models/leaderboard.js';
import { TeamModel } from './models/team.js';
import { UserModel } from './models/user.js';
import { WorkoutModel } from './models/workout.js';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const host = '0.0.0.0';
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
let dbReady = false;

const fallbackUsers = [
    { id: 'u1', name: 'Ari Jones', email: 'ari@example.com', role: 'coach', joinedAt: new Date().toISOString(), teamId: 't1' },
    { id: 'u2', name: 'Mina Park', email: 'mina@example.com', role: 'user', joinedAt: new Date().toISOString(), teamId: 't1' },
];

const fallbackActivities = [
    { id: 'a1', userId: 'u2', type: 'run', duration: 35, distanceKm: 5.2, date: new Date().toISOString() },
    { id: 'a2', userId: 'u2', type: 'strength', duration: 45, date: new Date().toISOString() },
];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health/', (req, res) => {
    res.json({ status: 'ok', port, apiUrl, mongoUri, dbReady });
});

app.get('/api/users/', async (req, res) => {
    if (!dbReady) {
        return res.json(fallbackUsers);
    }
    const users = await UserModel.find().lean();
    res.json(users);
});

app.post('/api/users/', async (req, res) => {
    if (!dbReady) {
        const user = { id: `u${fallbackUsers.length + 1}`, ...req.body, joinedAt: new Date().toISOString() };
        fallbackUsers.push(user);
        return res.status(201).json(user);
    }
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
});

app.get('/api/activities/', async (req, res) => {
    if (!dbReady) {
        return res.json(fallbackActivities);
    }
    const activities = await ActivityModel.find().lean();
    res.json(activities);
});

app.post('/api/activities/', async (req, res) => {
    if (!dbReady) {
        const activity = { id: `a${fallbackActivities.length + 1}`, ...req.body, date: new Date().toISOString() };
        fallbackActivities.push(activity);
        return res.status(201).json(activity);
    }
    const activity = await ActivityModel.create(req.body);
    res.status(201).json(activity);
});

app.get('/api/teams/', async (req, res) => {
    const teams = await TeamModel.find().lean();
    res.json(teams);
});

app.post('/api/teams/', async (req, res) => {
    const team = await TeamModel.create(req.body);
    res.status(201).json(team);
});

app.get('/api/activities/', async (req, res) => {
    const activities = await ActivityModel.find().lean();
    res.json(activities);
});

app.post('/api/activities/', async (req, res) => {
    const activity = await ActivityModel.create(req.body);
    res.status(201).json(activity);
});

app.get('/api/workouts/', async (req, res) => {
    const workouts = await WorkoutModel.find().lean();
    res.json(workouts);
});

app.post('/api/workouts/', async (req, res) => {
    const workout = await WorkoutModel.create(req.body);
    res.status(201).json(workout);
});

app.get('/api/leaderboard/', async (req, res) => {
    const leaderboard = await LeaderboardModel.find().sort({ rank: 1 }).lean();
    res.json(leaderboard);
});

connectDatabase()
    .then(() => {
        dbReady = true;
        console.log('Connected to MongoDB');
    })
    .catch((error) => console.error('MongoDB connection error:', error))
    .finally(() => {
        app.listen(port, host, () => {
            console.log(`Backend running on http://${host}:${port}`);
            console.log(`API URL: ${apiUrl}`);
        });
    });
