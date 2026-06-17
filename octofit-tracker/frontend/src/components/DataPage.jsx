import React, { useEffect, useState } from 'react';

function normalizeData(responseData) {
    if (Array.isArray(responseData)) {
        return responseData;
    }

    if (responseData?.items) {
        return responseData.items;
    }

    if (responseData?.results) {
        return responseData.results;
    }

    return [];
}

export default function DataPage({ title, endpoint, renderItem, rowKey }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(endpoint)
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                const data = await response.json();
                setItems(normalizeData(data));
            })
            .catch((fetchError) => {
                setError(fetchError.message || 'Unable to load data.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [endpoint]);

    return (
        <div className="container py-4">
            <h2>{title}</h2>
            {loading && <div className="alert alert-info">Loading {title}…</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && (
                <div className="list-group">
                    {items.length === 0 ? (
                        <div className="list-group-item">No {title.toLowerCase()} found.</div>
                    ) : (
                        items.map((item, index) => (
                            <div key={rowKey ? rowKey(item, index) : index} className="list-group-item">
                                {renderItem(item, index)}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
