import { Link, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiHost = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

function Home() {
    return (
        <div className="container py-5">
            <h1>OctoFit Tracker</h1>
            <p className="lead">
                This presentation tier uses React Router and fetches backend data from
                <code className="ms-1">{apiHost}/api/</code>.
            </p>
            <div className="alert alert-info">
                {codespaceName ? (
                    <span>
                        Using Codespaces API host <strong>{apiHost}</strong>.
                    </span>
                ) : (
                    <span>
                        <strong>VITE_CODESPACE_NAME is not defined.</strong>{' '}
                        The app will fall back to <code>http://localhost:8000</code> for local testing.
                        Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces.
                    </span>
                )}
            </div>
            <p>Use the navigation menu to view Users, Activities, Teams, Workouts, and Leaderboard data.</p>
        </div>
    );
}

export default function App() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">OctoFit</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/users">Users</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/activities">Activities</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/teams">Teams</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/workouts">Workouts</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users apiBase={apiHost} />} />
                <Route path="/activities" element={<Activities apiBase={apiHost} />} />
                <Route path="/teams" element={<Teams apiBase={apiHost} />} />
                <Route path="/workouts" element={<Workouts apiBase={apiHost} />} />
                <Route path="/leaderboard" element={<Leaderboard apiBase={apiHost} />} />
            </Routes>
        </div>
    );
}
