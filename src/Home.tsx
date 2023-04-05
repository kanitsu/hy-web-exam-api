import { useState } from 'react';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';

const style = {
    column: {
        position: 'relative' as 'relative',
        backgroundColor: 'red'
    },
    container: {
        position: 'absolute' as 'absolute',
        width: 414,
        height: 896,
        left: -207,
        //overflow: 'hidden'
    },
    explore: {
        position: 'absolute' as 'absolute',
        top: 0,
        width: '100%'
    },
    coverBottom: {
        position: 'absolute' as 'absolute',
        width: '100%',
        bottom: -655
    }
};

interface Props {
    position: number;
    downward: boolean;
}
export function Home({ position, downward }: Props): JSX.Element {
    const [playing, setPlaying] = useState(false);
    const [needClick, setNeedClick] = useState(true);

    const urls = [
        'http://localhost:3000/media/Volkswagen_Golf_7.m3u8',
        'http://localhost:3000/media/Toyota_Camry_XV70.m3u8',
        'http://localhost:3000/media/Rolls_Royce_Ghost.m3u8',
    ];

    return (
        <>
            <div style={style.column}>
                {urls.map((url, index) => (
                    <motion.div
                        style={style.container}
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
                            playing={index == position && playing}
                            loop={true}
                            controls={false}
                            playsinline={true}
                            url={url}
                            width='100%'
                            height='100%'
                            onError={e => { setPlaying(false); console.log('onError', e) }}
                        />\
                    </motion.div>
                ))}
            </div>
            {needClick && <img style={style.explore} onClick={() => { setNeedClick(false); setPlaying(true); console.log('play!') }} src='/explore.jpg' alt='explore page' />}
        </>
    );
}