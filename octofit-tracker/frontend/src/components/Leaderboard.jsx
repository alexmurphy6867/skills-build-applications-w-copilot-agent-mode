import React from 'react';
import DataPage from './DataPage.jsx';

export default function Leaderboard({ apiBase }) {
    return (
        <DataPage
            title="Leaderboard"
            endpoint={`${apiBase}/api/leaderboard/`}
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
