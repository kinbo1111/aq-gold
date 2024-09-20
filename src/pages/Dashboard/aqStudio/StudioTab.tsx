import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import VideoList from "../../../components/VideoList";
import FilterList from "../aqChannel/FilterList";
import ContentList from "./ContentList";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useVideo } from "../../../contexts/VideoContext";
import { useUser } from "../../../contexts/UserContext";

export type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const { videos } = useVideo();
  const { user } = useUser();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function StudioTab() {
  const { videos } = useVideo();
  const { user } = useUser();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 3) {
      navigate('/video-upload');
    }
  };

  
  useEffect(() => {
      const params = new URLSearchParams(location.search);
      const tabFromQuery = params.get("tab");
      if (tabFromQuery) {
          setValue(2);
      }
  }, [location]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "#585a5c" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="primary tabs example"
        >
          <Tab
            label={t("Home")}
            className="custom-tab"
            {...a11yProps(0)}
            sx={{ 
              "&.Mui-selected": { 
                color: "#fff", 
              },
            }}
          />
          <Tab
            label={t("Videos")}
            className="custom-tab"
            {...a11yProps(1)}
            sx={{ 
              "&.Mui-selected": { 
                color: "#fff", 
              },
            }}
          />
          <Tab
            label={t("Contents")}
            className="custom-tab"
            {...a11yProps(2)}
            sx={{ 
              "&.Mui-selected": { 
                color: "#fff", 
              },
            }}
          />
          <Tab
            label={t("Upload Videos")}
            className="custom-tab"
            {...a11yProps(3)}
            sx={{ 
              "&.Mui-selected": { 
                color: "#fff", 
              },
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <VideoList videoData={videos.filter(video => video.owner === user?.username)} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <FilterList />
        <VideoList videoData={videos.filter(video => video.owner === user?.username)} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ContentList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
      </CustomTabPanel>
    </Box>
  );
}
