import { useState } from "react";

export interface video_item {
    title: string;
    cover: string;
    play_url: string;
}

export function useGetVideoData() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error>();
    const [data, setData] = useState<{items:[video_item]}>();

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
