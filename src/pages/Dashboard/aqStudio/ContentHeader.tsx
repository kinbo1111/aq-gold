import React from 'react';
import { Box, Typography, Checkbox } from '@mui/material';

const ContentHeader: React.FC = () => {
  return (
    <Box display="flex" alignItems="center" py={2} px={1} borderBottom="1px solid #333">
    <Checkbox sx={{ color: '#9fa0a1', borderRadius: '4px', '&.Mui-checked': { color: '#9fa0a1' } }} />
      <Typography variant="body2" sx={{ width: 500, textAlign: 'left', fontWeight: 'bold', color: '#9fa0a1', fontSize: '14px' }}>Video</Typography>
      <Typography variant="body2" sx={{ width: 150, textAlign: 'left', fontWeight: 'bold', color: '#9fa0a1', fontSize: '14px' }}>Visibility</Typography>
      <Typography variant="body2" sx={{ width: 150, textAlign: 'left', fontWeight: 'bold', color: '#9fa0a1', fontSize: '14px' }}>Date</Typography>
      <Typography variant="body2" sx={{ width: 150, textAlign: 'left', fontWeight: 'bold', color: '#9fa0a1', fontSize: '14px' }}>Views</Typography>
      <Typography variant="body2" sx={{ width: 150, textAlign: 'left', fontWeight: 'bold', color: '#9fa0a1', fontSize: '14px' }}>Likes</Typography>
      <Typography variant="body2" sx={{ width: 150, textAlign: 'left', fontWeight: 'bold', color: '#9fa0a1', fontSize: '14px' }}>Edit</Typography>
      <Typography variant="body2" sx={{ width: 150, textAlign: 'left', fontWeight: 'bold', color: '#9fa0a1', fontSize: '14px' }}>Delete forever</Typography>
    </Box>
  );
};

export default ContentHeader;
