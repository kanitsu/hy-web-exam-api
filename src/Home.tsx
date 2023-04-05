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
    },
    popup: {
        position: 'absolute' as 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
    },
    popupContent: {
        marginTop: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'black',
        width: '60%',
        padding: 10,
        color: '#fff'
    },
    overlay: {
        position: 'fixed' as 'fixed',
        top: '-10%',
        justifyContent: 'center' as 'center',
        width: '70%',
        display: 'flex',
        flexDirection: 'row' as 'row',
        alignItems: 'center'
    },
    tabButton: {
        flex: 1,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center' as 'center',
    },
    tabButtonText: {
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 19,
        fontWeight: '900',
        color: '#fff'
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
    needTap: boolean;
    onFirstTap: () => void;
    onChangeSource: (id: number) => void;
}
export function Home({ position, downward, needTap, onFirstTap, onChangeSource }: Props): JSX.Element {
    const [playing, setPlaying] = useState(!needTap);
    const [active, setActive] = useState(0);

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
                            playing={index === position && playing}
                            loop={true}
                            controls={false}
                            playsinline={true}
                            url={url}
                            width='100%'
                            height='100%'
                            onError={e => { setPlaying(false); console.log('onError', e) }}
                        />
                    </motion.div>
                ))}
            </div>
            <div style={style.overlay}>
                <div style={style.tabButton} onClick={() => { setActive(0); onChangeSource(0); }}>
                    <span style={{
                        ...style.tabButtonText,
                        ...(active === 1 && { color: 'rgba(255, 255, 255, 0.6)' }),
                    }}>Following</span>
                </div>
                <div style={style.tabButton} onClick={() => { setActive(1); onChangeSource(1); }}>
                    <span style={{
                        ...style.tabButtonText,
                        ...(active === 0 && { color: 'rgba(255, 255, 255, 0.6)' }),
                    }}>For You</span>
                </div>
            </div>
            {needTap && <div style={style.popup} onClick={() => { onFirstTap(); setPlaying(true); console.log('play!') }}>
                <div style={style.popupContent}>
                    <h1 style={{ textAlign: 'center' }}>Tap to Play</h1>
                    Modern browsers have implemented policies that prevent videos from auto-playing unless they are muted. As a result, users are required to interact with the page before the video can be played normally. Hence, this popup is required.
                </div>
            </div>}
        </>
    );
}