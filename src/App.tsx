import { useState } from 'react';
import { Home } from './Home';
import { TabBar } from './components/TabBar';

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column' as 'column',
    backgroundColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

function App() {
  const [active, setActive] = useState('Home');
  return (
    <div style={styles.container}>
      <Home />
      <TabBar labels={['Home', 'Discover']} onChange={setActive} />
    </div>
  );
}

export default App;
