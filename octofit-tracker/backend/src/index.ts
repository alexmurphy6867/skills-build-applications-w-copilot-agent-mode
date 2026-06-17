import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { ActivityModel } from './models/activity';
import { LeaderboardModel } from './models/leaderboard';
import { TeamModel } from './models/team';
import { UserModel } from './models/user';
import { WorkoutModel } from './models/workout';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const host = '0.0.0.0';
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.githubpreview.dev`
    : `http://localhost:${port}`;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health/', (req, res) => {
    res.json({ status: 'ok', port, apiUrl, mongoUri });
});

app.get('/api/users/', async (req, res) => {
    const users = await UserModel.find().lean();
    res.json(users);
});

app.post('/api/users/', async (req, res) => {
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
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

mongoose.connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, host, () => {
            console.log(`Backend running on http://${host}:${port}`);
            console.log(`API URL: ${apiUrl}`);
        });
    })
    .catch((error) => console.error('MongoDB connection error:', error));
