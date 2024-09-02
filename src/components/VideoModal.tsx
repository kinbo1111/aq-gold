import React, { useEffect, useRef, useContext, useState, useCallback } from 'react';
import { API } from 'aws-amplify';
import { useParams } from 'react-router-dom';
import videojs from 'video.js';
import 'videojs-vr';
import 'videojs-vr/dist/videojs-vr.css';
import 'video.js/dist/video-js.css';
import { getUserActivity, createUserProgress, updateUserProgress } from '../graphql/mutations';
import { UserContext } from '../contexts/UserContext';

export type VideoModalProps = {
  show: boolean;
  onClose: () => void;
  videoUrl: string;
  videoId: string;
};

const VideoModal: React.FC<VideoModalProps> = ({ show, onClose, videoUrl, videoId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<videojs.Player | null>(null);
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within an AuthProvider!");
  }

  const { user } = userContext;
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!show || !videoRef.current) return;

    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      preload: 'auto',
    });

    player.vr({
      projection: 'AUTO',
      debug: true,
    });

    player.src(videoUrl);
    playerRef.current = player;

    return () => {
      player.dispose();
      playerRef.current = null;
    };
  }, [show, videoUrl]);

  useEffect(() => {
    if (!user || !videoId) return;

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
  }, [videoId, user]);

  const handleProgressUpdate = useCallback(
    async (currentTime: number) => {
      // Ensure currentTime is a valid number
      if (typeof currentTime !== 'number' || isNaN(currentTime)) {
        console.error('Invalid progress value:', currentTime);
        return;
      }

      setProgress(currentTime);

      try {
        const progressData = await API.graphql({
          query: getUserActivity,
          variables: { userId: user?.sub, videoId },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        }) as { data: { listUserActivities: { items: any[] } } };

        if (progressData.data.listUserActivities.items.length > 0) {
          // Update existing progress
          await API.graphql({
            query: updateUserProgress,
            variables: {
              input: {
                id: progressData.data.listUserActivities.items[0].id,
                progress: Math.round(currentTime), // Ensure it's an integer
                lastWatchedAt: new Date().toISOString(),
              },
            },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
          });
        } else {
          // Create new progress record
          await API.graphql({
            query: createUserProgress,
            variables: {
              input: {
                userId: user?.sub,
                videoId,
                progress: Math.round(currentTime), // Ensure it's an integer
                lastWatchedAt: new Date().toISOString(),
              },
            },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
          });
        }
      } catch (error) {
        console.error('Error updating user progress:', error);
        setError('Error updating user progress.');
      }
    },
    [user, videoId]
  );

  if (isLoading) return <div>Loading video...</div>;
  if (error) return <div>{error}</div>;

  return show ? (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <button onClick={onClose} style={styles.closeButton}>X</button>
        <video
          ref={videoRef}
          className="video-js vjs-default-skin"
          playsInline
          autoPlay
          onTimeUpdate={(e) => handleProgressUpdate((e.target as HTMLVideoElement).currentTime)}
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
