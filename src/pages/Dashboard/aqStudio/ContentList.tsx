import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ContentItem from './ContentItem';
import ContentHeader from './ContentHeader';
import { fetchVideos } from '../../../services/ApiService';
import Item from "../../../assets/images/content.png"
import { useVideo } from '../../../contexts/VideoContext';
import { useUser } from '../../../contexts/UserContext';

const ContentList: React.FC = () => {
  const [isReload, setIsReload] = useState(false);
  const { videos } = useVideo();
  const { user } = useUser();
  
  console.log(videos)
  return (
    <Box>
      <ContentHeader />
      {videos.filter(video => video.owner === user?.sub).map((item, index) => (
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
