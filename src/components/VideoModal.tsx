import React, { useEffect, useRef, useState, useCallback } from 'react';
import { API } from 'aws-amplify';
import { useParams } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { getUserActivity, createUserProgress, updateUserProgress } from '../graphql/mutations';
import { useUser } from '../contexts/UserContext';

export type VideoModalProps = {
  show: boolean;
  onClose: () => void;
  videoUrl: string;
  videoId: string;
};

const VideoModal: React.FC<VideoModalProps> = ({ show, onClose, videoUrl, videoId }) => {
  const videoRef = useRef<HTMLVideoElement>(null); 
  const containerRef = useRef<HTMLDivElement>(null); 
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null); 

  const { user } = useUser();
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && videoId) {
      const fetchUserProgress = async () => {
        setIsLoading(true);
        try {
          const progressData = await API.graphql({
            query: getUserActivity,
            variables: { userId: user.sub, videoId },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
          }) as { data: { listUserActivities: { items: any[] } } };

          if (progressData.data.listUserActivities.items.length > 0) {
            setProgress(progressData.data.listUserActivities.items[0].progress);
          }
        } catch (error) {
          console.error('Error fetching user progress:', error);
          setError('Error fetching user progress.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserProgress();
    }
  }, [videoId, user]);

  useEffect(() => {
    if (show && containerRef.current && videoRef.current && videoUrl) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 0, 0.1);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      const geometry = new THREE.SphereGeometry(500, 60, 40);
      geometry.scale(-1, 1, 1); 

      const videoTexture = new THREE.VideoTexture(videoRef.current);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;

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
    }
  }, [show, videoUrl]);

  const handleProgressUpdate = useCallback(
    async (currentTime: number) => {
      if (typeof currentTime === 'number' && !isNaN(currentTime)) {
        setProgress(currentTime);

        try {
          const progressData = await API.graphql({
            query: getUserActivity,
            variables: { userId: user?.sub, videoId },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
          }) as { data: { listUserActivities: { items: any[] } } };

          const existingProgress = progressData.data.listUserActivities.items.length > 0;
          const mutation = existingProgress ? updateUserProgress : createUserProgress;
          const input = existingProgress
            ? {
                id: progressData.data.listUserActivities.items[0].id,
                progress: Math.round(currentTime),
                lastWatchedAt: new Date().toISOString(),
              }
            : {
                userId: user?.sub,
                videoId,
                progress: Math.round(currentTime),
                lastWatchedAt: new Date().toISOString(),
              };

          await API.graphql({
            query: mutation,
            variables: { input },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
          });
        } catch (error) {
          console.error('Error updating user progress:', error);
          setError('Error updating user progress.');
        }
      }
    },
    [user, videoId]
  );

  if (isLoading) return <div>Loading video...</div>;
  if (error) return <div>{error}</div>;

  return show ? (
    <div style={styles.overlay}>
      <div style={styles.contentWrapper}>
        <button onClick={onClose} style={styles.closeButton}>X</button>
        <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
        <video
           style={styles.videoElement}
            ref={videoRef}
            src={videoUrl}
            muted
            autoPlay
            onTimeUpdate={(e) => handleProgressUpdate((e.target as HTMLVideoElement).currentTime)}
          />
        </div>
       
      </div>
    </div>
  ) : null;
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
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
  contentWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'rgba(50, 50, 50, 0.7)',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '35px',
    height: '35px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '600',
    zIndex: 1100,
  },
  videoElement: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', 
  },
};

export default VideoModal;
