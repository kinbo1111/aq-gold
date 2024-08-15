import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ContentItem from './ContentItem';
import ContentHeader from './ContentHeader';
import { fetchVideos } from '../../../services/ApiService';
import Item from "../../../assets/images/content.png"

const ContentList: React.FC = () => {
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
    <Box>
      <ContentHeader />
      {videos.map((item, index) => (
        <ContentItem
          key={index}
          image={item.thumbnailUrl}
          title={item.title}
          description={item.description}
          visibility="show"
          date={item.createdAt.slice(0,10)}
          views={item.views}
          likes={item.likes}
        />
      ))}
    </Box>
  );
};

export default ContentList;
