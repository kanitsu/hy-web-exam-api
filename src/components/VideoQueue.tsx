import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import ReactPlayer from 'react-player';

interface VideoInfo {
    "cover": string;
    "play_url": string;
    "title": string;
};
interface VideoState {
    progress: number;
    isBuffering: boolean;
};
interface Props {
    videoInfos: VideoInfo[] | [];
}
export function VideoQueue({ videoInfos }: Props): JSX.Element {
    const [playing, setPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [downward, setDownward] = useState(true);


    // const urls = [
    //     'http://localhost:3000/media/Volkswagen_Golf_7.m3u8',
    //     'http://localhost:3000/media/Toyota_Camry_XV70.m3u8',
    //     'http://localhost:3000/media/Rolls_Royce_Ghost.m3u8',
    // ];

    const handlers = useSwipeable({
        onSwipedUp: (eventData) => {
            if (position < videoInfos.length - 1) {
                setPosition(position + 1);
                setDownward(false);
            }
        },
        onSwipedDown: (eventData) => {
            if (position > 0) {
                setPosition(position - 1);
                setDownward(true);
            }
        },
    });

    return (
        <>
        <div {...handlers}>
            {videoInfos.map((video, index) => (
                <motion.div
                    key={index}
                    animate={{
                        top: `${(index - position) * 896 - (downward ? 496 : 400)}px`,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}>
                    <ReactPlayer
                        crossOrigin='anonymous'
                        playing={playing}
                        loop={true}
                        controls={false}
                        playsinline={true}
                        // className='react-player'
                        url={video.play_url}
                        width='100%'
                        height='100%'
                        onError={e => { setPlaying(false); console.log('onError', e) }}
                    />
                </motion.div>
            ))}
        </div>
        </>
    )
}