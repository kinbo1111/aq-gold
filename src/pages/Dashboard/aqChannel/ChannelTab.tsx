import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import VideoList from "../../../components/VideoList";
import FilterList from "./FilterList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
            label="Home"
            className="custom-tab"
            {...a11yProps(0)}
            sx={{ 
              "&.Mui-selected": { 
                color: "#fff", 
              },
            }}
          />
          <Tab
            label="Videos"
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
        <VideoList/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <FilterList/>
        <VideoList/>
      </CustomTabPanel>
    </Box>
  );
}
