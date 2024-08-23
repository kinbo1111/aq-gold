import React, {useState} from 'react';
import { Box, Typography, IconButton, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteContent from './deleteContent';

interface ContentItemProps {
  image: string;
  title: string;
  description: string;
  visibility: string;
  date: string;
  views: string;
  likes: string;
}

const ContentItem: React.FC<ContentItemProps> = ({ image, title, description, visibility, date, views, likes }) => {

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const handleDeleteConfirmClose = () => setIsOpenDelete(false);
  const handleDeleteConfirmOpen = () => setIsOpenDelete(true);
  return (
    <Box display="flex" alignItems="center" py={2} px={1} borderBottom="1px solid #333">
      <Checkbox sx={{ color: '#9fa0a1', borderRadius: '4px', '&.Mui-checked': { color: '#9fa0a1' } }} />
      <Box sx={{ width: 500, display: 'flex', alignItems: 'center' }}>
        <img src={image} alt={title} style={{ width: '135px', height: 'auto' }} />
        <div className='ml-3 w-[350px] gap-2'>
            <Typography variant="body2" sx={{ textAlign: 'left', fontWeight: 'bold', color: '#eaeaeb', fontSize: '14px' }}>{title}</Typography>
            <Typography variant="body2" sx={{ textAlign: 'left', fontWeight: 'regular', color: '#9fa0a1', fontSize: '14px' }}>{description}</Typography>
        </div>
      </Box>
      <Typography variant="body2" sx={{ width: 150, textAlign: 'left', fontWeight: 'regular', color: '#9fa0a1', fontSize: '14px'  }}>{visibility}</Typography>
      <Typography variant="body2" sx={{ width: 150, textAlign: 'left', fontWeight: 'regular', color: '#9fa0a1', fontSize: '14px'  }}>{date}</Typography>
      <Typography variant="body2" sx={{ width: 150, textAlign: 'left', fontWeight: 'regular', color: '#9fa0a1', fontSize: '14px'  }}>{views}</Typography>
      <Typography variant="body2" sx={{ width: 150, textAlign: 'left', fontWeight: 'regular', color: '#9fa0a1', fontSize: '14px'  }}>{likes}</Typography>
      <Box sx={{ width: 150 }}>
        <IconButton>
          <EditIcon className='text-[#9fa0a1]'/>
        </IconButton>
      </Box>
      <Box sx={{ width: 150 }}>
        <IconButton  onClick={handleDeleteConfirmOpen}>
          <DeleteIcon className='text-[#9fa0a1]' />
        </IconButton>
      </Box>
      <DeleteContent isOpen={isOpenDelete} title={'"' + title + '"'} onClose={handleDeleteConfirmClose}/>
    </Box>
  );
};

export default ContentItem;
