import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { getUserProgress } from '../services/UserActivityService';
import VideoPlayer from './VideoPlayer';

const ContinueWatching: React.FC = () => {
  const { user } = useUser();
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserActivity = async () => {
      if (!user || user.sub === undefined) return;
      try {
        const activity = await getUserProgress(user.sub);
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
