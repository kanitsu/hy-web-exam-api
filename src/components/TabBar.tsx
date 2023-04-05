import { useState } from 'react';

interface Props {
  labels: string[];
  onChange?: (label: string) => void;
}

const styles = {
  tabBar: {
    position: 'absolute' as 'absolute',
    bottom: 0,
    //paddingBottom: 20,
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

export function TabBar({ labels, onChange }: Props): JSX.Element {
  const [active, setActive] = useState(0);

  const handleClick = (index: number) => () => {
    setActive(index);
    if (onChange) {
      onChange(labels[index]);
    }
  };

  return (
    <div style={styles.tabBar}>
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