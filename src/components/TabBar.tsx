import { useState } from 'react';

const styles = {
    tabBar: {
        position: 'absolute' as 'absolute',
        bottom: 0,
        width: '100%',
        height: 30,
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'row' as 'row',
    },
    tabButton: {
        flex: 1,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontWeight: '400',
        overflow: 'hidden'
    },
    tabButtonText: {
        color: '#fff',
        textAlign: 'center' as 'center',
        fontStyle: 'normal',
        fontSize: 10,
        lineHeight: 12,
        letterSpacing: 0.15,
    },
};

interface Props {
    labels: string[];
    active: number;
    downward: boolean;
    onChange?: (index: number) => void;
}
export function TabBar({ labels, active, downward, onChange }: Props): JSX.Element {

    const handleClick = (index: number) => () => {
        if (onChange) {
            onChange(index);
        }
    };

    return (
        <div style={{ ...styles.tabBar, ...(!downward && { bottom: -113 }), }}>
            {labels.map((label, index) => (
                <div
                    key={index}
                    style={{
                        ...styles.tabButton,
                        ...(active === index && { fontWeight: '900' }),
                    }}
                    onClick={handleClick(index)}
                >
                    <span style={styles.tabButtonText}>{label}</span>
                </div>
            ))}
        </div>
    );
}