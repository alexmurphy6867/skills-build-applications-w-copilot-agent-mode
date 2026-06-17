import DataPage from './DataPage.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiHost = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
const endpoint = `${apiHost}/api/leaderboard/`;

export default function Leaderboard() {
    return (
        <DataPage
            title="Leaderboard"
            endpoint={endpoint}
            rowKey={(entry) => entry.id || entry._id || JSON.stringify(entry)}
            renderItem={(entry) => (
                <div>
                    <h5>Rank {entry.rank}</h5>
                    <p className="mb-1">Score: {entry.score}</p>
                    <small className="text-muted">User ID: {entry.userId}</small>
                </div>
            )}
        />
    );
}
