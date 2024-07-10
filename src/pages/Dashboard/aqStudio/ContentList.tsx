import React from 'react';
import { Box } from '@mui/material';
import ContentItem from './ContentItem';
import ContentHeader from './ContentHeader';
import Item from "../../../assets/images/content.png"

const contentItems = [
  {
    image: Item,
    title: 'Video Title Video Title Video Title Video Title',
    description: 'video description',
    visibility: 'Draft',
    date: '',
    views: '-',
    likes: '-',
  },
  {
    image: Item,
    title: 'Video Title Video Title Video Title Video Title',
    description: 'video description',
    visibility: 'Scheduled',
    date: 'Jun 1, 2024',
    views: '0',
    likes: '-',
  },
  {
    image: Item,
    title: 'Video Title Video Title Video Title Video Title',
    description: 'video description',
    visibility: 'Public',
    date: 'Apr 12, 2024',
    views: '12,000',
    likes: '1,919',
  },
  {
    image: Item,
    title: 'Video Title Video Title Video Title Video Title',
    description: 'video description',
    visibility: 'Public',
    date: 'Apr 1, 2024',
    views: '1,000',
    likes: '100',
  },
];

const ContentList: React.FC = () => {
  return (
    <Box>
      <ContentHeader />
      {contentItems.map((item, index) => (
        <ContentItem
          key={index}
          image={item.image}
          title={item.title}
          description={item.description}
          visibility={item.visibility}
          date={item.date}
          views={item.views}
          likes={item.likes}
        />
      ))}
    </Box>
  );
};

export default ContentList;
