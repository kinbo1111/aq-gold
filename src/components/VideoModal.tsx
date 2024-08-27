import React, {useEffect, useRef} from 'react';
import videojs from 'video.js';
import 'videojs-vr';
import 'videojs-vr/dist/videojs-vr.css';
import 'video.js/dist/video-js.css';

interface VideoModalProps {
  show: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ show, onClose, videoUrl }) => {
const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<videojs.Player | null>(null);

  useEffect(() => {
    if (!show || !videoRef.current) return;

    if (!playerRef.current) {
      const player = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: 'auto',
      });

      player.vr({
        projection: 'AUTO',
        debug: true,
      });

      player.src(videoUrl)

      playerRef.current = player;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [show, videoUrl]);
 
return show ? (
  <div style={styles.modalOverlay}>
    <div style={styles.modalContent}>
      <button onClick={onClose} style={styles.closeButton}>X</button>
      <video 
        ref={videoRef} 
        className="video-js vjs-default-skin" 
        playsInline 
        autoPlay 
      />
    </div>
  </div>
) : null;

};

const styles = {
  modalOverlay: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    position: 'relative' as 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', 
  },
  closeButton: {
    position: 'absolute' as 'absolute',
    top: '10px',
    right: '10px',
    background: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    fontSize: '20px',
    fontWeight: 'bold' as 'bold',
    zIndex: 1001,
  },
};

export default VideoModal;
