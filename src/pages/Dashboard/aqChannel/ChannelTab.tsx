import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { API } from "aws-amplify";
import VideoList from "../../../components/VideoList";
import FilterList from "./FilterList";
import { useTranslation } from 'react-i18next';
import { listFavoriteChannels } from '../../../graphql/queries';
import { useUser } from "../../../contexts/UserContext";

export type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export type FavoriteChannel = {
  id: string;
  channelOwnerId: string;
  createdAt: string;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
 
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

export default function ChannelTab() {
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();
  const { user } = useUser();
  const [channels, setChannels] = useState<FavoriteChannel[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  useEffect(() => {
    const fetchFavoriteChannels = async () => {
      try {
        const favoriteChannelsData = await API.graphql({
          query: listFavoriteChannels,
          variables: {
            filter: { userId: { eq: user?.sub } },
          },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        }) as { data: { listFavoriteChannels: { items: FavoriteChannel[] } } };

        setChannels(favoriteChannelsData.data.listFavoriteChannels.items);
      } catch (error) {
        console.error('Error fetching favorite channels:', error);
      }
    };

    fetchFavoriteChannels();
  }, [user]);

  useEffect(() => {
    console.log(channels)

  },[channels])

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
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <VideoList videoData={[]}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <FilterList/>
        <VideoList videoData={[]}/>
      </CustomTabPanel>
    </Box>
  );
}
