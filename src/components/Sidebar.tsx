import React, { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  ProSidebarProvider,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import AgeConfirmModal from "./AgeConfirmModal";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { GoHome } from "react-icons/go";
import { AiFillHeart } from "react-icons/ai";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import { MdFilterList, MdVideoLibrary, MdAddToQueue } from "react-icons/md";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { IoSettingsSharp } from "react-icons/io5";
import { useTranslation } from 'react-i18next';

import Logo from "./header/Logo";

const SidebarMenu = () => {
  const { collapseSidebar } = useProSidebar();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const handleToggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen fixed bottom-0 left-0 sidebar z-50">
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
            {t("Home")}
          </MenuItem>
          <MenuItem component={ <Link to="dashboard/favourite"/>} icon={<AiFillHeart size={24} className="text-white" />}>
            {t("New & Popular")}
          </MenuItem>
          <SubMenu
            label={t("Categories")}
            icon={<MdFilterList size={24} className="text-white" />}
          >
            <MenuItem className="submenu" component={<Link to="/dashboard/category/natural" />}>
              {t("Natural")}
            </MenuItem>
            <MenuItem className="submenu" component={<Link to="/dashboard/category/relaxation" />}>
              {t("Relaxation")}
            </MenuItem> 
            <MenuItem className="submenu" component={<Link to="/dashboard/category/music" />}>
              {t("Music & Musicals")}
            </MenuItem>
            <MenuItem className="submenu" component={<Link to="/dashboard/category/travel" />}>
              {t("Travel & Adventure")}
            </MenuItem>
            <MenuItem className="submenu" component={<Link to="/dashboard/category/sport" />}>
              {t("Sport")}
            </MenuItem>
            <MenuItem className="submenu" component={<Link to="/dashboard/category/game" />}>
              {t("VR＆Games")}
            </MenuItem>
            <MenuItem className="submenu" component={<Link to="/dashboard/category/romance" />}>
              {t("Romance")}
            </MenuItem>
            <MenuItem className="submenu" component={<Link to="/dashboard/category/horror" />}>
              {t("Horror")}
            </MenuItem>
            <MenuItem className="submenu" component={<Link to="/dashboard/category/documentaries" />}>
              {t("Documentaries")}
            </MenuItem>
            <MenuItem className="submenu" component={<Link to="/dashboard/category/animal" />}>
              {t("Animal")}
            </MenuItem>
            <MenuItem className="submenu" component={<Link to="/dashboard/category/entertainment" />}>
              {t("Variety Entertainment")}
            </MenuItem>
            <MenuItem className="submenu" component={<Link to="/dashboard/category/AQvr" />}>
              {t("AQvr")}
            </MenuItem>
            <MenuItem className="submenu" component={<Link to="/dashboard/category/kids" />}>
              {t("Kids & Family")}
            </MenuItem>
            <MenuItem onClick={handleToggleModal} className="submenu" component={<Link to="/dashboard/AQ18" />}>
              {t("AQ18+")}
            </MenuItem>
          </SubMenu>
          <MenuItem component={<Link to="/dashboard/my-list" />} icon={<MdAddToQueue size={24} className="text-white" />}>
            {t("My List")}
          </MenuItem>
          <MenuItem component={<Link to="/dashboard/aq-studio" />} icon={<MdVideoLibrary size={24} className="text-white" />}>
            {t("AQ Studio")}
          </MenuItem>
          <MenuItem component={<Link to="/dashboard/settings" />} icon={<IoSettingsSharp size={24} className="text-white" />}>
            {t("Settings")}
          </MenuItem>
        </Menu>
      </Sidebar>
      {isOpen && <AgeConfirmModal isOpen={isOpen} onClose={handleToggleModal} />}
    </div>
  );
};

export default SidebarMenu;
