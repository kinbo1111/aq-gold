import React, { useEffect, useRef, useState } from 'react';
import { Button, Space, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { BiExitFullscreen } from "react-icons/bi";
import { FaPause } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";

declare global {
  interface Window {
    VRView: any;
  }
}

const VRPlayer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoUrl = location.state;
  const vrViewRef = useRef<HTMLDivElement>(null); 
  const vrPlayerInstance = useRef<any>(null); 
  const [isInitialized, setIsInitialized] = useState(false); 
  const [isPlaying, setIsPlaying] = useState(false); 
  const [hasError, setHasError] = useState(false); 
  const [userInteracted, setUserInteracted] = useState(false); 

  useEffect(() => {
    const initializeVRPlayer = () => {
      if (vrViewRef.current && !vrPlayerInstance.current && window.VRView) {

        const existingIframes = vrViewRef.current.querySelectorAll('iframe');
        existingIframes.forEach((iframe) => iframe.remove());

        vrPlayerInstance.current = new window.VRView.Player('#vrview', {
          video: videoUrl,
          is_stereo: true,
          width: '100%',
          height: '100%',
          is_vr_off: false,
          is_autopan_off: true,
          disable_sensor: true, 
        });

        vrPlayerInstance.current.on('ready', () => {
          console.log('VR View is ready');
          setIsInitialized(true);
        });

        vrPlayerInstance.current.on('error', (event: any) => {
          console.error('Error loading VR View:', event);
          setHasError(true);
        });
      }
    };

    initializeVRPlayer(); 

    return () => {
      if (vrPlayerInstance.current) {
        console.log('Cleaning up VR Player...');
        vrPlayerInstance.current = null;
      }
    };
  }, [videoUrl]);

  const handlePlayPause = () => {
    if (!userInteracted) {
      message.warning("Please interact with the page before playing the video.");
      return;
    }

    if (isInitialized && vrPlayerInstance.current) {
      if (isPlaying) {
        vrPlayerInstance.current.pause();
        console.log('Video paused');
      } else {
        const playPromise = vrPlayerInstance.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Video playing');
            })
            .catch((error: any) => {
              if (error.name === 'NotAllowedError') {
                alert(
                  'Autoplay blocked. Please click on the Play button again after interacting with the page.'
                );
              } else {
                console.error('Error playing video:', error);
                setHasError(true);
              }
            });
        } else {
          console.warn('The play method does not return a promise in this browser.');
        }
      }
      setIsPlaying(!isPlaying); 
    } else {
      console.warn('Player is not ready yet.');
    }
  };

  const handleUserInteraction = () => {
    setUserInteracted(true);
  };

  const enterFullscreen = () => {
    if (vrViewRef.current) {
      vrViewRef.current.requestFullscreen().catch((error) => {
        console.error('Failed to enter fullscreen:', error);
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: '#000' }}
      onClick={handleUserInteraction} 
    >
      <div
        id="vrview"
        ref={vrViewRef}
        tabIndex={0} 
        style={{ width: '100%', height: '100%' }}
      />
      <Button
        onClick={handleBack}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          fontSize: '24px',
          fontWeight: 'bold',
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          zIndex: 2, 
        }}
      >
        &times;
      </Button>
<div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex items-center bg-black bg-opacity-50 px-8 py-3 rounded-full z-10 shadow-lg">
      <button
        onClick={handlePlayPause}
        disabled={!isInitialized || hasError}
        className="text-white bg-white bg-opacity-10 hover:bg-opacity-30 transition-all duration-300 rounded-full p-3 focus:outline-none"
      >
        {isPlaying ? (
          <FaPause className="text-3xl" />
        ) : (
          <IoPlay className="text-3xl" />
        )}
      </button>
      
      <button
        onClick={enterFullscreen}
        className="ml-6 text-white bg-white bg-opacity-10 hover:bg-opacity-30 transition-all duration-300 rounded-full p-3 focus:outline-none"
      >
        <BiExitFullscreen className="text-3xl" />
      </button>
    </div>

    </div>
  );
};

export default VRPlayer;
