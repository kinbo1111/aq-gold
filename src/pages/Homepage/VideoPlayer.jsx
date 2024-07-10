import React from 'react';
import videojs from 'video.js';
import VideoJS from '../../components/Video';

const VideoPlayer = () => {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'https://ik.imagekit.io/ikmedia/example_video.mp4',
      type: 'video/mp4'
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
  );
}

export default VideoPlayer;