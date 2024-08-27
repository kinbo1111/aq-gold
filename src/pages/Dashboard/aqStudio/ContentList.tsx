import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ContentItem from './ContentItem';
import ContentHeader from './ContentHeader';
import { fetchVideos } from '../../../services/ApiService';
import Item from "../../../assets/images/content.png"

const ContentList: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [isReload, setIsReload] = useState(false);

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
  }, [isReload]);
  return (
    <Box>
      <ContentHeader />
      {videos.map((item, index) => (
        <ContentItem
          id={item.id}
          key={index}
          image={item.thumbnailUrl}
          title={item.title}
          description={item.description}
          visibility="show"
          onReload={() => setIsReload(!isReload)}
          date={item.createdAt.slice(0,10)}
          views={item.viewCount}
          likes={item.favoriteCount}
        />
      ))}
    </Box>
  );
};

export default ContentList;
