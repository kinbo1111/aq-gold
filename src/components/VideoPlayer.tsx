import React, { useEffect, useRef, useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { updateUserProgress, getUserProgress } from '../services/UserActivityService';

interface VideoPlayerProps {
  videoId: string;
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, videoUrl }) => {
       const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("userContext must be used within an AuthProvider!")
    }
    const { user } = userContext;
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fetch user progress for the video when the component mounts
  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) return;
      try {
        const userProgress = await getUserProgress(user.id);
        const videoProgress = userProgress.find(item => item.videoId === videoId);
        if (videoProgress) {
          setProgress(videoProgress.progress);
        }
      } catch (error) {
        console.error('Error fetching user progress:', error);
      }
    };

    fetchProgress();
  }, [user, videoId]);

  // Update progress when the video is played
  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = progress;
      videoRef.current.play();
    }
  };

  // Update the progress when the video is paused
  const handleVideoPause = async () => {
    if (videoRef.current && user) {
      const currentProgress = Math.floor(videoRef.current.currentTime);
      setProgress(currentProgress);

      try {
        await updateUserProgress(user.id, videoId, currentProgress);
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        style={{ width: '100%', height: 'auto' }}
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
      />
    </div>
  );
};

export default VideoPlayer;
