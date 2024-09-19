import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { API } from "aws-amplify";
import { useTranslation } from "react-i18next";
import { listFavoriteChannels } from "../../../graphql/queries";
import { useUser } from "../../../contexts/UserContext";
import { useVideo } from "../../../contexts/VideoContext";
import VideoList from "../../../components/VideoList";
import FavoriteChannelList from "./FavoriteChannelList";
import AQStudioUploadModal from "./AQStudioUploadModal";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

type FavoriteChannel = {
  id: string;
  channelOwnerId: string;
  createdAt: string;
};

function CustomTabPanel({ children, value, index, ...other }: TabPanelProps) {
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

export default function ListTab() {
  const { t } = useTranslation();
  const { user } = useUser();
  const { favoriteVideos, continueVideos } = useVideo();

  const [value, setValue] = useState(0);
  const [channels, setChannels] = useState<FavoriteChannel[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchFavoriteChannels = async () => {
      try {
        const { data } = await API.graphql({
          query: listFavoriteChannels,
          variables: { filter: { userId: { eq: user?.sub } } },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        }) as { data: { listFavoriteChannels: { items: FavoriteChannel[] } } };

        setChannels(data.listFavoriteChannels.items);
      } catch (error) {
        console.error("Error fetching favorite channels:", error);
      }
    };

    if (user) {
      fetchFavoriteChannels();
    }
  }, [user]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "#585a5c" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="tabs example"
        >
          {[
            t("Continue Watching"),
            t("My Contents List"),
            t("My Favorite AQvar"),
            t("AQ Studio"),
          ].map((label, index) => (
            <Tab
              key={index}
              label={label}
              {...a11yProps(index)}
              className="custom-tab"
              sx={{ "&.Mui-selected": { color: "#fff" } }}
            />
          ))}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <VideoList videoData={continueVideos} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <VideoList videoData={favoriteVideos} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <FavoriteChannelList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <AQStudioUploadModal />
      </CustomTabPanel>
    </Box>
  );
}
