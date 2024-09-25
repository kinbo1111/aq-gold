import React, {useState, useEffect} from 'react';
import VideoItem from './VideoItem';
import { fetchVideos } from '../services/ApiService';
import { VideoData } from '../types';

const VideoList: React.FC<{ className?: string, videoData: VideoData[] }> = ({ className, videoData }) => {
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
    <div className={`video-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7  ${className ?? ''}`}>
        {videoData.map((item, index) => (
        <VideoItem
            key={index}
            owner={item.owner}
            id={item.id}
            videoUrl={item.videoUrl}
            imageSrc={item.thumbnailUrl ?? ''}
            videos={videos}
            channelId={item.channelId}
            title={item.title}
            description={item.description ?? ''}
            viewCount={item.viewCount}
            duration={item.duration}
            favoriteCount={item.favoriteCount}
        />
        ))}
    </div>
  );
};

export default VideoList;
