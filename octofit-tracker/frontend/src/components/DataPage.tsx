import React, { useEffect, useState } from 'react';

export type DataPageProps<T> = {
    title: string;
    endpoint: string;
    renderItem: (item: T, index: number) => React.ReactNode;
    rowKey?: (item: T, index: number) => string | number;
};

export default function DataPage<T>({ title, endpoint, renderItem, rowKey }: DataPageProps<T>) {
    const [items, setItems] = useState<T[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(endpoint)
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                const data = await response.json();
                const list = Array.isArray(data) ? data : data.items || data.results || [];
                setItems(list);
            })
            .catch((fetchError) => {
                setError(fetchError.message);
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
