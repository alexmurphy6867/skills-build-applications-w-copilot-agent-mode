import DataPage from './DataPage.jsx';

export default function Teams({ apiBase }) {
    return (
        <DataPage
            title="Teams"
            endpoint={`${apiBase}/api/teams/`}
            rowKey={(team) => team.id || team._id || JSON.stringify(team)}
            renderItem={(team) => (
                <div>
                    <h5>{team.name}</h5>
                    <p className="mb-1">{team.description}</p>
                    <small className="text-muted">
                        Created: {team.createdAt ? new Date(team.createdAt).toLocaleDateString() : 'Unknown'}
                    </small>
                </div>
            )}
        />
    );
}
