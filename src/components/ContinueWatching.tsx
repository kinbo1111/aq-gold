import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { getUserProgress } from '../services/UserActivityService';
import VideoPlayer from './VideoPlayer';

const ContinueWatching: React.FC = () => {
     const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("userContext must be used within an AuthProvider!")
    }
    const { user } = userContext;
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserActivity = async () => {
      if (!user) return;
      try {
        const activity = await getUserProgress(user.id);
        setVideos(activity);
      } catch (error) {
        console.error('Error fetching user activity:', error);
      }
    };

    fetchUserActivity();
  }, [user]);

  if (videos.length === 0) return <div>No videos to continue watching.</div>;

  return (
    <div>
      <h2>Continue Watching</h2>
      <div className="video-list">
        {videos.map((video) => (
          <div key={video.videoId}>
            <VideoPlayer videoId={video.videoId} videoUrl={video.video.videoUrl} />
            <p>{video.video.title}</p>
            <p>Last watched at {new Date(video.lastWatchedAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContinueWatching;
