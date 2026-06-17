import DataPage from './DataPage.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiHost = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
const endpoint = `${apiHost}/api/teams/`;

export default function Teams() {
    return (
        <DataPage
            title="Teams"
            endpoint={endpoint}
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
