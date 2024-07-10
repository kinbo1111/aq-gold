import React from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  ProSidebarProvider,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { GoHome } from "react-icons/go";
import { AiFillHeart } from "react-icons/ai";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import { MdFilterList } from "react-icons/md";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import { MdVideoLibrary } from "react-icons/md";

import { MdAddToQueue } from "react-icons/md";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { IoSettingsSharp } from "react-icons/io5";

import Logo from "./header/Logo";

const SidebarMenu = () => {
  const { collapseSidebar, rtl } = useProSidebar();
  return (
    <div className="flex h-screen fixed bottom-0 left-0 top-10 sidebar z-50">
      <Sidebar className="app" rtl={false}>
        <Menu>
          <MenuItem
            component={<Link to="/" className="link" />}
            className="menu1"
            icon={
              <MenuRoundedIcon
                onClick={() => {
                  collapseSidebar();
                }}
                className="hamburger"
              />
            }
          >
            <Logo />
          </MenuItem>
          <hr className="mb-6" />
          <MenuItem component={<Link to="/dashboard/" />} icon={<GoHome size={24} className="text-white" />}>
            Home
          </MenuItem>
          <MenuItem icon={<AiFillHeart size={24} className="text-white" />}>
            New & Popular
          </MenuItem>
          <SubMenu
            label="Categories"
            icon={<MdFilterList size={24} className="text-white" />}
          >
            <MenuItem className="submenu">Natural</MenuItem>
            <MenuItem className="submenu">Relaxation</MenuItem>
            <MenuItem className="submenu">Music & Musicals</MenuItem>
            <MenuItem className="submenu">Travel & Adventure</MenuItem>
            <MenuItem className="submenu">Sport</MenuItem>
            <MenuItem className="submenu">VR＆Games</MenuItem>
            <MenuItem className="submenu">Romance</MenuItem>
            <MenuItem className="submenu">Horror</MenuItem>
            <MenuItem className="submenu">Documentaries</MenuItem>
            <MenuItem className="submenu">Animal</MenuItem>
            <MenuItem className="submenu">Variety Entertainment</MenuItem>
            <MenuItem className="submenu">AQvr</MenuItem>
            <MenuItem className="submenu">Kids & Family</MenuItem>
            <MenuItem className="submenu">AQ18+</MenuItem>
          </SubMenu>
          <MenuItem component={<Link to="/dashboard/my-list" />} icon={<MdAddToQueue size={24} className="text-white" />}>
            My List
          </MenuItem>
          <MenuItem component={<Link to="/dashboard/aq-studio" />} icon={<MdVideoLibrary size={24} className="text-white" />}>
            AQ Studio
          </MenuItem>
          <MenuItem component={<Link to="/dashboard/settings" />} icon={<IoSettingsSharp size={24} className="text-white" />}>
            Settings
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarMenu;
