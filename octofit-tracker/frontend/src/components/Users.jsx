import DataPage from './DataPage.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiHost = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
const endpoint = `${apiHost}/api/users/`;

export default function Users() {
    return (
        <DataPage
            title="Users"
            endpoint={endpoint}
            rowKey={(user) => user.id || user._id || JSON.stringify(user)}
            renderItem={(user) => (
                <div>
                    <h5>{user.name}</h5>
                    <p className="mb-1">
                        <strong>{user.role}</strong> • {user.email}
                    </p>
                    <small className="text-muted">
                        Team: {user.teamId || 'Unassigned'} • Joined: {user.joinedAt ? new Date(user.joinedAt).toLocaleString() : 'Unknown'}
                    </small>
                </div>
            )}
        />
    );
}
