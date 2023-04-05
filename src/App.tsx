import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { TabBar } from './components/TabBar';
import { Discover } from './Discover';
import { Home } from './Home';

const style = {
  app: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 700
  }
};

function App() {
  const [position, setPosition] = useState(0);
  const [downward, setDownward] = useState(true);
  const [needClick, setNeedClick] = useState(true);

  const labels = ['Home', 'Discover'];
  const [active, setActive] = useState(0);

  const urls = [
    'http://localhost:3000/media/Volkswagen_Golf_7.m3u8',
    'http://localhost:3000/media/Toyota_Camry_XV70.m3u8',
    'http://localhost:3000/media/Rolls_Royce_Ghost.m3u8',
  ];

  const onChangeSource = (id: number) => {

  }

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
    <div {...handlers} style={style.app}>
      {active === 0 && <Home position={position} downward={downward} needTap={needClick} onFirstTap={() => setNeedClick(false)} onChangeSource={onChangeSource}/>}
      {active === 1 && <Discover />}
      <TabBar labels={labels} active={active} onChange={setActive} downward={downward} />
    </div>
  );
}

export default App;