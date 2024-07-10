import React from 'react';
import VideoItem from './VideoItem';
import { videoData } from '../utils/content';

const VideoList = () => {
  return (
    <div className="video-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {videoData.map((item, index) => (
        <VideoItem
            key={index}
            imageSrc={item.imageSrc}
            title={item.title}
            description={item.description}
        />
        ))}
    </div>
  );
};

export default VideoList;
