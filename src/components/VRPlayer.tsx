import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Hls from 'hls.js';
import { FaPlay, FaPause, FaExpand } from 'react-icons/fa';
import { message } from 'antd';

declare const Kaleidoscope: any;

const VRPlayer: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const videoUrl = location.state as string;
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  let viewer: any = null;
   
  useEffect(() => {
    
    let hls: Hls | null = null;

    if (viewerRef.current && videoUrl) {
      const video = document.createElement('video');
      video.setAttribute('crossorigin', 'anonymous');
      video.setAttribute('playsinline', 'true');
      video.setAttribute('muted', 'true');
      videoRef.current = video;

      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
          setIsPlaying(true);
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoUrl;
        video.play();
        setIsPlaying(true);
      } else {
        message.warning("HLS.js is not supported on this browser");
        return;
      }

      viewer = new Kaleidoscope.Video({
        source: video,
        container: viewerRef.current,
        height: window.innerHeight,
        width: window.innerWidth,
      });
      viewer.render();

      video.addEventListener('play', () => {
        setIsPlaying(true);
        console.log("Video playing");
      });
      video.addEventListener('pause', () => { 
        setIsPlaying(false);
        console.log("Video paused");
      });

      const handlePlay = () => {
        setOverlayVisible(false);
        setTimeout(() => setShowOverlay(false), 500);
        viewer?.play();
      };

      viewerRef.current.addEventListener('touchend', handlePlay);
      document.body.addEventListener('click', handlePlay);

      const handleResize = () => {
        if (viewer) {
          viewer.setSize({ height: window.innerHeight, width: window.innerWidth });
        }
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        document.body.removeEventListener('click', handlePlay);
        viewerRef.current?.removeEventListener('touchend', handlePlay);

        video.removeEventListener('play', () => setIsPlaying(true));
        video.removeEventListener('pause', () => setIsPlaying(false));

        if (hls) {
          hls.destroy();
          hls = null;
        }
        if (viewer) {
          try {
            viewer.destroy();
          } catch (error) {
            console.warn("Error destroying viewer:", error);
          }
          viewer = null;
        }
      };
    }
  }, [videoUrl]);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleFullScreen = () => {
    if (viewerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        viewerRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900">
      <div
        id="container360"
        ref={viewerRef}
        className="absolute top-0 left-0 w-full h-full cursor-pointer"
      />

      {showOverlay && (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white text-lg text-center transition-opacity duration-500 ease-in-out ${
            overlayVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="text-center cursor-pointer">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-pulse
              transition-transform transform duration-500 ease-in-out scale-100 hover:scale-105"
            >
              {t("playPrompt")}
            </h1>
            <p className="text-gray-400 text-base md:text-lg lg:text-xl animate-fadeIn opacity-70">
              {t("experiencePrompt")}
            </p>
          </div>
        </div>
      )}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button
          className="text-white text-lg font-bold px-4 py-2 rounded-full bg-black bg-opacity-60 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none z-10"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button
          onClick={toggleFullScreen}
          className="text-white text-lg font-bold px-4 py-2 rounded-full bg-black bg-opacity-60 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none z-10"
        >
          <FaExpand />
        </button>
      </div>

      <button
        onClick={handleBack}
        className="absolute top-4 right-4 text-white text-3xl font-bold px-4 py-2 rounded-full 
        bg-gradient-to-r from-red-500 to-pink-600 hover:from-pink-500 hover:to-red-600 
        shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none z-10"
      >
        &times;
      </button>
    </div>
  );
};

export default VRPlayer;
