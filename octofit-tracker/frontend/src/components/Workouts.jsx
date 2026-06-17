import DataPage from './DataPage.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiHost = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
const endpoint = `${apiHost}/api/workouts/`;

export default function Workouts() {
    return (
        <DataPage
            title="Workouts"
            endpoint={endpoint}
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
