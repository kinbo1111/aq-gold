import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { API } from 'aws-amplify';
import { message } from 'antd'; // Import message from antd
import videojs from 'video.js';
import 'videojs-vr';
import 'videojs-vr/dist/videojs-vr.css';
import 'video.js/dist/video-js.css';
import { getUserActivity, createUserProgress, updateUserProgress } from '../graphql/mutations';
import { useUser } from '../contexts/UserContext';

// Define the type for the VR plugin object
type VideoJsVrPlugin = {
  getProjection: () => string;
};

const VideoContent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<videojs.Player | null>(null);

  const { user } = useUser();
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { videoId } = useParams<{ videoId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const videoUrl = location.state?.videoUrl;

  const handleCloseModal = () => {
    message.destroy(); // Clear any existing messages
    message.info('Video closed'); // Info message on modal close
    navigate(-1); // Navigate back to the previous page
  };

  // Initialize video.js with VR and handle potential errors
  useEffect(() => {
    if (videoRef.current && videoUrl) {
      const player = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: 'auto',
      });

      try {
        const vrOptions = {
          projection: 'AUTO',
          debug: true,
        };

        // Initialize VR
        player.vr(vrOptions);

        // Wait for VR to initialize
        player.on('loadedmetadata', () => {
          // Type assertion: tell TypeScript this is a VR plugin
          const vrPlugin = player.vr() as unknown as VideoJsVrPlugin;

          // Check if the video is not VR
          const vrProjection = vrPlugin && vrPlugin.getProjection ? vrPlugin.getProjection() : 'NONE';

          if (vrProjection === 'NONE') {
            message.warning('This video is not VR-supported.'); // Show warning message for non-VR video
          }
        });

        player.src(videoUrl);
        playerRef.current = player;
      } catch (error) {
        message.destroy(); // Clear previous messages
        console.error('VR setup failed:', error);
        message.error('VR setup failed.'); // Show error message for VR setup failure
        setError('VR setup failed.');
      }

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
          playerRef.current = null;
        }
      };
    }
  }, [videoUrl]);

  // Fetch user progress and handle errors
  useEffect(() => {
    if (user && videoId) {
      const fetchUserProgress = async () => {
        setIsLoading(true);
        message.destroy(); // Clear previous messages
        message.loading('Fetching video progress...'); // Loading message when fetching progress

        try {
          const progressData = await API.graphql({
            query: getUserActivity,
            variables: { userId: user.sub, videoId },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
          }) as { data: { listUserActivities: { items: any[] } } };

          if (progressData.data.listUserActivities.items.length > 0) {
            setProgress(progressData.data.listUserActivities.items[0].progress);
            message.destroy(); // Clear the loading message before showing success
            message.success('Video progress fetched successfully!'); // Success message
          }
        } catch (error) {
          message.destroy(); // Clear previous messages
          console.error('Error fetching user progress:', error);
          message.error('Error fetching user progress.'); // Error message
          setError('Error fetching user progress.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserProgress();
    }
  }, [videoId, user]);

  // Handle progress updates and API errors
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
          message.destroy(); // Clear previous messages
          console.error('Error updating video progress:', error);
          message.error('Error updating video progress.'); // Error message
          setError('Error updating video progress.');
        }
      }
    },
    [user, videoId]
  );

  if (!videoUrl) {
    message.destroy(); // Clear previous messages
    message.error('Video URL is missing.'); // Error message if video URL is missing
    return <div>Loading...</div>;
  }

  if (isLoading) return <div>Loading video...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <button onClick={handleCloseModal} style={styles.closeButton}>X</button>
        <video
          ref={videoRef}
          className="video-js vjs-default-skin"
          playsInline
          autoPlay
          onTimeUpdate={(e) => handleProgressUpdate((e.target as HTMLVideoElement).currentTime)}
        />
      </div>
    </div>
  );
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
    position: 'absolute' as 'absolute',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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

export default VideoContent;
