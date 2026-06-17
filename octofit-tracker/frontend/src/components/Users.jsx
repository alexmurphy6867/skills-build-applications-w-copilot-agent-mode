import DataPage from './DataPage.jsx';

export default function Users({ apiBase }) {
    return (
        <DataPage
            title="Users"
            endpoint={`${apiBase}/api/users/`}
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
