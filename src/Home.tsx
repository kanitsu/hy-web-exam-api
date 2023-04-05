import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import ReactPlayer from 'react-player';
import { VideoQueue } from './components/VideoQueue';
import { useGetVideoData } from './hooks/useGetVideoData';

export function Home(): JSX.Element {
    const [active, setActive] = useState(0);

    const { loadInfo, data, loading, error } = useGetVideoData();

    useEffect(() => loadInfo('http://localhost:3000/following_list'), []);

    return (
        <>
            <VideoQueue videoInfos={data ? data.items : []} />
        </>
    )
}