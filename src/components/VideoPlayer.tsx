import React, { useEffect, useRef, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { updateUserProgress, getUserProgress } from '../services/UserActivityService';

interface VideoPlayerProps {
  videoId: string;
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, videoUrl }) => {
   
  const { user } = useUser();
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
        if(user.sub === undefined) return;
        await updateUserProgress(user.sub, videoId, currentProgress);
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
