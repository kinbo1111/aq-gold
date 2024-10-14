import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

declare const Kaleidoscope: any;

const VRPlayer: React.FC = () => {
  const containerId = 'container360';
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const videoUrl = location.state;
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const [showOverlay, setShowOverlay] = useState(true); 
  const [overlayVisible, setOverlayVisible] = useState(true); 

  useEffect(() => {
    if (viewerRef.current) {
      const viewer = new Kaleidoscope.Video({
        source: videoUrl,
        containerId: `#${containerId}`,
        height: window.innerHeight,
        width: window.innerWidth,
      });

      viewer.render();

      const canvasElements = viewerRef.current.querySelectorAll('canvas');
      if (canvasElements.length > 0) {
        canvasElements[0].style.display = 'none';
      }

      const handlePlay = () => {
        setOverlayVisible(false); 
        setTimeout(() => setShowOverlay(false), 500); 
        viewer.play();
      };

      viewerRef.current.addEventListener('touchend', handlePlay);
      document.body.addEventListener('click', handlePlay);

      const handleResize = () => {
        viewer.setSize({ height: window.innerHeight, width: window.innerWidth });
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        document.body.removeEventListener('click', handlePlay);
      };
    }
  }, [videoUrl]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
<div className="relative w-full h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900">
  <div
    id={containerId}
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
