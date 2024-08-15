import React, {useState, useEffect} from 'react';
import VideoItem from './VideoItem';
import { fetchVideos } from '../services/ApiService';

const VideoList = () => {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const videoList = await fetchVideos();
        setVideos(videoList);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    loadVideos();
  }, []);
  return (
    <div className="video-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {videos.map((item, index) => (
        <VideoItem
            key={index}
            videoUrl={item.videoUrl}
            imageSrc={item.thumbnailUrl}
            videos={videos}
            title={item.title}
            description={item.description}
        />
        ))}
    </div>
  );
};

export default VideoList;
