import React, { useEffect, useRef, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { updateUserProgress, getUserProgress } from '../services/UserActivityService';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface VideoPlayerProps {
  videoId: string;
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, videoUrl }) => {
  const { user } = useUser();
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) return;
      try {
        const userProgress = await getUserProgress(user.id);
        const videoProgress = userProgress.find((item) => item.videoId === videoId);
        if (videoProgress) {
          setProgress(videoProgress.progress);
        }
      } catch (error) {
        console.error('Error fetching user progress:', error);
      }
    };

    fetchProgress();
  }, [user, videoId]);

  useEffect(() => {
    if (!videoContainerRef.current || !videoRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 0.1); 
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    videoContainerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); 

    const videoTexture = new THREE.VideoTexture(videoRef.current);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;

    const material = new THREE.MeshBasicMaterial({ map: videoTexture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = progress;
      videoRef.current.play().then(() => {
        console.log('Video playing from progress:', progress);
      }).catch((error) => {
        console.error('Error playing video:', error);
      });
    }
  };

  const handleVideoPause = async () => {
    if (videoRef.current && user) {
      const currentProgress = Math.floor(videoRef.current.currentTime);
      setProgress(currentProgress);

      try {
        if (user.sub === undefined) return;
        await updateUserProgress(user.sub, videoId, currentProgress);
        console.log('Progress saved:', currentProgress);
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div ref={videoContainerRef} style={{ width: '100%', height: '100%' }}></div>

      <video
        ref={videoRef}
        src={videoUrl}
        loop
        muted
        style={{ display: 'none' }} 
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
      />
    </div>
  );
};

export default VideoPlayer;
