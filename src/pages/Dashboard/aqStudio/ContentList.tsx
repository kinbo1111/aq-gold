import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ContentItem from './ContentItem';
import ContentHeader from './ContentHeader';
import { fetchVideos } from '../../../services/ApiService';
import { useVideo } from '../../../contexts/VideoContext';
import { useUser } from '../../../contexts/UserContext';

const ContentList: React.FC = () => {
  const [isReload, setIsReload] = useState(false);
  const { videos } = useVideo();
  const { user } = useUser();
  
  return (
    <Box>
      <ContentHeader />
      {videos.filter(video => video.owner === user?.username).map((item, index) => (
        <ContentItem
          key={index}
          visibility="show"
          onReload={() => setIsReload(!isReload)}
          videoData = {item}  
        />
      ))}
    </Box>
  );
};

export default ContentList;
