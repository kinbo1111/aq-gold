import React, { useEffect, useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import AgeConfirmModal from "./AgeConfirmModal";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Link, useLocation } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { AiFillHeart } from "react-icons/ai";
import { MdFilterList, MdVideoLibrary, MdAddToQueue } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { useTranslation } from 'react-i18next';
import Logo from "./header/Logo";
import { categories } from "../const";
import { useSidebar } from '../contexts/SidebarContext';


const SidebarMenu: React.FC = () => {
  const location = useLocation();
  const { onCollapseToggle, collapsed } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const handleToggleModal = () => {
    setIsOpen(!isOpen);
  };

  
  const isActive = (path: string): boolean => {
    const isSelected = location.pathname.includes(path);
    return isSelected;
  };

  return (
    <div className="onCollapseToggle h-screen fixed bottom-0 left-0 sidebar z-50">
      <Sidebar className="app" rtl={false} collapsed={collapsed}>
        <Menu>
          <MenuItem
            component={<Link to="/" className="link" />}
            className="logo-menu menu1"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
          >
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} w-full`}>
            <MenuRoundedIcon
              onClick={onCollapseToggle}
              className={`text-2xl ${collapsed ? 'mr-0' : 'mr-2'}`} // Adjust margin when collapsed
            />
            {!collapsed && <Logo />}
          </div>
          </MenuItem>
          <MenuItem
            component={<Link to="/dashboard" />}
            icon={<GoHome size={24} className="text-white" />}
            className={`logo-menu ${isActive('dashboard') && 'selected'}`}
          >
            {t("Home")}
          </MenuItem>
          <MenuItem
            component={<Link to="/favorite" />}
            icon={<AiFillHeart size={24} className="text-white" />}
            className={`${isActive('favorite') && 'selected'}`}
          >
            {t("New & Popular")}
          </MenuItem>
          <SubMenu
            label={t("Categories")}
            icon={<MdFilterList size={24} className="text-white" />}
          >
          {categories.map((category, index) => {
            const isAQ18 = category.path === '/AQ18';

            return (
              <MenuItem
                key={index}
                component={<Link to={category.path} />}
                className={`submenu ${isActive(category.path) ? 'selected' : ''}`}
                onClick={isAQ18 ? handleToggleModal : undefined}  // Use onClick only for AQ18
              >
                {t(category.name)}
              </MenuItem>
            );
          })}

          </SubMenu>
          <MenuItem
            component={<Link to="/my-list" />}
            icon={<MdAddToQueue size={24} className="text-white" />}
            className={`${isActive('my-list') && 'selected'}`}
          >
            {t("My List")}
          </MenuItem>
          <MenuItem
            component={<Link to="/aq-studio" />}
            icon={<MdVideoLibrary size={24} className="text-white" />}
            className={`${isActive('aq-studio') && 'selected'}`}
          >
            {t("AQ Studio")}
          </MenuItem>
          <MenuItem
            component={<Link to="/settings" />}
            icon={<IoSettingsSharp size={24} className="text-white" />}
            className={`${isActive('settings') && 'selected'}`}
          >
            {t("Settings")}
          </MenuItem>
        </Menu>
      </Sidebar>
      {isOpen && <AgeConfirmModal isOpen={isOpen} onClose={handleToggleModal} />}
    </div>
  );
};

export default SidebarMenu;
