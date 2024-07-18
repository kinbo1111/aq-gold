import React from 'react';
import { Box, Typography, Checkbox } from '@mui/material';

import { useTranslation } from "react-i18next";

const ContentHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box display="flex" alignItems="center" py={2} px={1} borderBottom="1px solid #333">
    <Checkbox sx={{ color: '#9fa0a1', borderRadius: '4px', '&.Mui-checked': { color: '#9fa0a1' } }} />
      <Typography variant="body2" sx={{ width: 500, textAlign: 'left', fontWeight: 'bold', color: '#9fa0a1', fontSize: '14px' }}>{t("Video")}</Typography>
      <Typography variant="body2" sx={{ width: 150, textAlign: 'left', fontWeight: 'bold', color: '#9fa0a1', fontSize: '14px' }}>{t("Visibility")}</Typography>
      <Typography variant="body2" sx={{ width: 150, textAlign: 'left', fontWeight: 'bold', color: '#9fa0a1', fontSize: '14px' }}>{t("Date")}</Typography>
      <Typography variant="body2" sx={{ width: 150, textAlign: 'left', fontWeight: 'bold', color: '#9fa0a1', fontSize: '14px' }}>{t("Views")}</Typography>
      <Typography variant="body2" sx={{ width: 150, textAlign: 'left', fontWeight: 'bold', color: '#9fa0a1', fontSize: '14px' }}>{t("Likes")}</Typography>
      <Typography variant="body2" sx={{ width: 150, textAlign: 'left', fontWeight: 'bold', color: '#9fa0a1', fontSize: '14px' }}>{t("Edit")}</Typography>
      <Typography variant="body2" sx={{ width: 150, textAlign: 'left', fontWeight: 'bold', color: '#9fa0a1', fontSize: '14px' }}>{t("Delete forever")}</Typography>
    </Box>
  );
};

export default ContentHeader;
