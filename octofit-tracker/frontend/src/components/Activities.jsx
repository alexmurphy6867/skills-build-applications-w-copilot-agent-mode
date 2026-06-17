import DataPage from './DataPage.jsx';

export default function Activities({ apiBase }) {
    return (
        <DataPage
            title="Activities"
            endpoint={`${apiBase}/api/activities/`}
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
