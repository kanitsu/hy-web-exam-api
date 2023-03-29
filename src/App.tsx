import React from 'react';
import ReactPlayer from 'react-player'
import './App.css';

function App() {
  const [playing, setPlaying] = React.useState(false);
  const [needClick, setNeedClick] = React.useState(true);
  return (
    <>
      <ReactPlayer
        playing={playing}
        loop={true}
        controls={false}
        playsinline={true}
        className='react-player'
        url='http://localhost:3000/media/Toyota_Camry_XV70.m3u8'
        width='100%'
        height='100%'
        onError={e => { setNeedClick(true); setPlaying(false); console.log('onError', e) }}
        onReady={() => console.log('onReady')}
        onStart={() => console.log('onStart')}
        onPlay={() => console.log('onPlay')}
      />
      {needClick && <img className='explore-page' onClick={() => { setNeedClick(false); setPlaying(true); console.log('play!') }} src='/explore.jpg' alt='explore page' />}
    </>
  );
}

export default App;
