import DataPage from './DataPage.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiHost = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
const endpoint = `${apiHost}/api/activities/`;

export default function Activities() {
    return (
        <DataPage
            title="Activities"
            endpoint={endpoint}
            rowKey={(activity) => activity.id || activity._id || JSON.stringify(activity)}
            renderItem={(activity) => (
                <div>
                    <h5>{activity.type}</h5>
                    <p className="mb-1">
                        Duration: {activity.duration} min
                        {activity.distanceKm ? ` • ${activity.distanceKm} km` : ''}
                    </p>
                    <small className="text-muted">
                        User: {activity.userId} • {activity.date ? new Date(activity.date).toLocaleString() : 'No date'}
                    </small>
                </div>
            )}
        />
    );
}
