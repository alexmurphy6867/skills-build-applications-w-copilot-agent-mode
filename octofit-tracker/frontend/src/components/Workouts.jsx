import DataPage from './DataPage.jsx';

export default function Workouts({ apiBase }) {
    return (
        <DataPage
            title="Workouts"
            endpoint={`${apiBase}/api/workouts/`}
            rowKey={(workout) => workout.id || workout._id || JSON.stringify(workout)}
            renderItem={(workout) => (
                <div>
                    <h5>{workout.name}</h5>
                    <p className="mb-1">
                        Category: {workout.category} • Duration: {workout.durationMinutes} min
                    </p>
                    {workout.exercises && workout.exercises.length > 0 && (
                        <small className="text-muted">Exercises: {workout.exercises.join(', ')}</small>
                    )}
                </div>
            )}
        />
    );
}
