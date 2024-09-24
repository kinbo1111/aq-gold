import React, {useState, useEffect} from 'react';
import { Box, Typography, IconButton, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteContent from './deleteContent';
import EditContent from './editContent';
import { VideoData } from '../../../types';

interface ContentItemProps {
  onReload: () => void;
  videoData: VideoData;
  visibility: string;
}

const ContentItem: React.FC<ContentItemProps> = ({ videoData, onReload, visibility }) => {

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const handleDeleteConfirmClose = () => setIsOpenDelete(false);
  const handleDeleteConfirmOpen = () => setIsOpenDelete(true);
  const handleEditOpen = () => setIsOpenEdit(true);
  const handleEditClose = () => setIsOpenEdit(false);

  useEffect(() => {
    if (isOpenDelete) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'auto'; 
    }   
  }, [isOpenDelete]);

  useEffect(() => {
    onReload && onReload();
  }, [isOpenEdit, isOpenDelete]);

  return (
    <Box display="flex" alignItems="center" py={2} px={1} borderBottom="1px solid #333">
      <Checkbox sx={{ color: '#9fa0a1', borderRadius: '4px', '&.Mui-checked': { color: '#9fa0a1' } }} />
      <Box sx={{ width: 500, display: 'flex', alignItems: 'center' }}>
        <img src={videoData.thumbnailUrl} alt={videoData.title} style={{ width: '135px', height: 'auto' }} />
        <div className='ml-3 w-[350px] gap-2'>
            <Typography variant="body2" sx={{ textAlign: 'left', fontWeight: 'bold', color: '#eaeaeb', fontSize: '14px' }}>{videoData.title}</Typography>
            <Typography variant="body2" sx={{ textAlign: 'left', fontWeight: 'regular', color: '#9fa0a1', fontSize: '14px' }}>{videoData.description}</Typography>
        </div>
      </Box>
      <Typography variant="body2" sx={{ width: 150, textAlign: 'left', fontWeight: 'regular', color: '#9fa0a1', fontSize: '14px'  }}>{visibility}</Typography>
      <Typography variant="body2" sx={{ width: 150, textAlign: 'left', fontWeight: 'regular', color: '#9fa0a1', fontSize: '14px'  }}>{videoData.createdAt.slice(0,10)}</Typography>
      <Typography variant="body2" sx={{ width: 150, textAlign: 'left', fontWeight: 'regular', color: '#9fa0a1', fontSize: '14px'  }}>{videoData.viewCount}</Typography>
      <Typography variant="body2" sx={{ width: 150, textAlign: 'left', fontWeight: 'regular', color: '#9fa0a1', fontSize: '14px'  }}>{videoData.favoriteCount}</Typography>
      <Box sx={{ width: 150 }}>
        <IconButton onClick={handleEditOpen}>
          <EditIcon className='text-[#9fa0a1]'/>
        </IconButton>
      </Box>
      <Box sx={{ width: 150 }}>
        <IconButton  onClick={handleDeleteConfirmOpen}>
          <DeleteIcon className='text-[#9fa0a1]' />
        </IconButton>
      </Box>
      <DeleteContent isOpen={isOpenDelete} id={videoData.id} title={'"' + videoData.title + '"'} onClose={handleDeleteConfirmClose}/>
      <EditContent isOpen={isOpenEdit} videoData={videoData} onClose={handleEditClose} />
    </Box>
  );
};

export default ContentItem;
