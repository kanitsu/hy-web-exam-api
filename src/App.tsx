import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { TabBar } from './components/TabBar';
import { Discover } from './Discover';
import { Home } from './Home';
import { useGetVideoData } from './hooks/useGetVideoData';

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

  const { loadInfo, data, loading, error } = useGetVideoData();
  useEffect(() => loadInfo('http://localhost:3000/following_list'), []);

  const onChangeSource = (id: number) => {
    if (id === 0) {
      loadInfo('http://localhost:3000/following_list');
    } else {
      loadInfo('http://localhost:3000/for_you_list');
    }
  }

  const handlers = useSwipeable({
    onSwipedUp: (eventData) => {
      if (data && position < data.items.length - 1) {
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
      {active === 0 && <Home videos={data ? data.items : []} position={position} downward={downward} needTap={needClick} onFirstTap={() => setNeedClick(false)} onChangeSource={onChangeSource}/>}
      {active === 1 && <Discover />}
      <TabBar labels={labels} active={active} onChange={setActive} downward={downward} />
    </div>
  );
}

export default App;