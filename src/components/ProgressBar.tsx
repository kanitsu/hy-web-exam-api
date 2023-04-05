import { useEffect, useRef, useState, TouchEvent } from "react";

const styles = {
    container: {
        position: 'fixed' as 'fixed',
        width: '100%',
        height: 100,
        bottom: 30,
    },
    touchable: {
        position: 'absolute' as 'absolute',
        bottom: 0,
        width: '100%',
        height: 30,
    },
    seeker: {
        position: 'absolute' as 'absolute',
        bottom: 0,
        width: 15,
        height: 15,
        backgroundColor: 'white',
    },
    bar: {
        position: 'absolute' as 'absolute',
        bottom: 0,
        width: '100%',
        height: 3,
        backgroundColor: '#999',
    },
    content: {
        height: 3,
        backgroundColor: '#fff',
    },
};

interface Props {
    progress: number;
    onDragEnd?: (value: number) => void;
}
export function ProgressBar({ progress, onDragEnd }: Props): JSX.Element {
    const [location, setLocation] = useState(progress);
    const [active, setActive] = useState(false);
    const [drag, setDrag] = useState(false);
    const [time, setTime] = useState(2000);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (time < 0) {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            setActive(false);
            setDrag(false);
            setTime(1500);
        }
    }, [time]);

    useEffect(() => {
        if (!drag) {
            setLocation(progress);
        }
    }, [progress]);

    function handleClick() {
        if (!active) {
            setActive(true);
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime - 100);
            }, 100);
        }
    }

    function handleDrag(event: TouchEvent<HTMLDivElement>) {
        if (!drag) {
            setDrag(true);
        }
        setLocation(event.touches[0].clientX * 100.0 / windowWidth);
        setTime(1500);
    }

    function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
        if (drag) {
            setDrag(false);
            if (onDragEnd) {
                onDragEnd(location / 100.0);
            }
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.touchable} onClick={handleClick} onTouchMove={handleDrag} onTouchEnd={handleTouchEnd} >
                <div style={styles.bar}>
                    <div style={{ ...styles.content, width: progress + '%' }} />
                    <div style={{
                        ...styles.seeker,
                        left: location + '%',
                        ...(!active && { display: 'none' }),
                    }}></div>
                </div>
            </div>
        </div>
    );
}
