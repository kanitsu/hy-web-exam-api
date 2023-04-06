import { useState } from 'react';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
import { video_item } from './hooks/useGetVideoData';
import { ProgressBar } from './components/ProgressBar';
import Marquee from "react-fast-marquee";

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
    marquee: {
        position: 'absolute' as 'absolute',
        bottom: 75,
        left: 10,
        justifyContent: 'center',
        width: '60%',
        color: '#fff'
    },
    coverBottom: {
        position: 'absolute' as 'absolute',
        width: '100%',
        bottom: -655
    }
};

interface VideoState {
    progress: number;
    isBuffering: boolean;
};
interface Props {
    videos: video_item[];
    position: number;
    downward: boolean;
    needTap: boolean;
    intial: boolean;
    onFirstTap: () => void;
    onChangeSource: (id: number) => void;
}
export function Home({ videos, position, downward, needTap, intial, onFirstTap, onChangeSource }: Props): JSX.Element {
    const [playing, setPlaying] = useState(!needTap);
    const [active, setActive] = useState(0);
    const [status, setStatus] = useState<VideoState[]>([]);
    const [durations, setDurations] = useState<number[]>([]);
    const [players, setPlayers] = useState<ReactPlayer[]>([]);

    const [progress0, setProgress0] = useState(0);
    const [progress1, setProgress1] = useState(0);

    const handlePlaybackStatusUpdate = (index: number) => (state: any) => {
        const newStatus = [...status];
        newStatus[index] = { progress: state.played * 100.0, isBuffering: state.isBuffering };
        setStatus(newStatus);
    }

    const handleVideoDuration = (index: number) => (duration: any) => {
        const newDurations = [...durations];
        newDurations[index] = duration
        setDurations(newDurations);
    }

    const playerRefs = [
        (player: ReactPlayer) => players[0] = player,
        (player: ReactPlayer) => players[1] = player,
        (player: ReactPlayer) => players[2] = player,
    ];

    const handleProgressBarUpdate = (value: number) => {
        players[position].seekTo(value, 'fraction');
    }

    const handleReady = (index: number) => () => {
        if(index === position) {
            console.log(active, progress0, progress1)
            players[position].seekTo(active === 0 ? progress0 : progress1, 'fraction')
        }
    }

    return (
        <>
            <div style={style.column}>
                {videos?.map((video, index) => (
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
                            ref={playerRefs[index]}
                            playing={index === position && playing}
                            loop={true}
                            controls={false}
                            playsinline={true}
                            url={video.play_url}
                            width='100%'
                            height='100%'
                            onError={e => console.error(index, e) }
                            onProgress={handlePlaybackStatusUpdate(index)}
                            onDuration={handleVideoDuration(index)}
                            // onReady={handleReady(index)}
                        />
                    </motion.div>
                ))}
            </div>
            <div style={style.overlay}>
                <div style={style.tabButton} onClick={() => { if(active === 1) {setActive(0); onChangeSource(0);} setProgress1(status[position] ? status[position].progress : 0)}}>
                    <span style={{
                        ...style.tabButtonText,
                        ...(active === 1 && { color: 'rgba(255, 255, 255, 0.6)' }),
                    }}>Following</span>
                </div>
                <div style={style.tabButton} onClick={() => { if(active === 0) {setActive(1); onChangeSource(1);} setProgress0(status[position] ? status[position].progress : 0)}}>
                    <span style={{
                        ...style.tabButtonText,
                        ...(active === 0 && { color: 'rgba(255, 255, 255, 0.6)' }),
                    }}>For You</span>
                </div>
            </div>
            <ProgressBar progress={status[position] ? status[position].progress : 0} onDragEnd={handleProgressBarUpdate} />
            <Marquee
                style={style.marquee} 
                gradient={false}
            >
                <span style={{fontSize: 15}}>{`${videos[position]?.title}`}</span>
            </Marquee>
            {needTap && <div style={style.popup} onClick={() => { onFirstTap(); setPlaying(true); }}>
                <div style={style.popupContent}>
                    <h1 style={{ textAlign: 'center' }}>Tap to Play</h1>
                    Modern browsers have implemented policies that prevent videos from auto-playing unless they are muted. As a result, users are required to interact with the page before the video can be played normally. Hence, this popup is required.
                </div>
            </div>}
        </>
    );
}