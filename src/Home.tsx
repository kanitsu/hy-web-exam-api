import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import ReactPlayer from 'react-player';

export function Home(): JSX.Element {
    const [playing, setPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [downward, setDownward] = useState(true);
    const [needClick, setNeedClick] = useState(true);


    const urls = [
        'http://localhost:3000/media/Volkswagen_Golf_7.m3u8',
        'http://localhost:3000/media/Toyota_Camry_XV70.m3u8',
        'http://localhost:3000/media/Rolls_Royce_Ghost.m3u8',
    ];

    const handlers = useSwipeable({
        onSwipedUp: (eventData) => {
            if (position < urls.length - 1) {
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
        <div {...handlers} className="column">
            {urls.map((url, index) => (
                <motion.div
                    className="container"
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
                        url={url}
                        width='100%'
                        height='100%'
                        onError={e => { setPlaying(false); console.log('onError', e) }}
                    />
                </motion.div>
            ))}
        </div>
        {needClick && <img className='explore-page' onClick={() => { setNeedClick(false); setPlaying(true); console.log('play!') }} src='/explore.jpg' alt='explore page' />}
        </>
    )
}