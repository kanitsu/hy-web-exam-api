import { useState } from "react";

export function useGetVideoData() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error>();
    const [data, setData] = useState<{items:{}}>();

    const loadInfo = (url: string) => {
        setLoading(true);
        fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json'
            }
        }).then(response => response.json())
            .then(json => setData(json))
            .catch(e => setError(e));
        setLoading(false);
    };

    return { loadInfo, data, loading, error };
}
