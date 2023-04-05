import { useState } from 'react';
import { Home } from './Home';
import { TabBar } from './components/TabBar';
import { Discover } from './Discover';

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column' as 'column',
    backgroundColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
    height: 896,
  },
};

function App() {
  const [active, setActive] = useState('Home');
  return (
    <div style={styles.container}>
      {/* <Home /> */}
      <Discover />
      <TabBar labels={['Home', 'Discover']} onChange={setActive} />
    </div>
  );
}

export default App;