import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineVideoCall } from "react-icons/md";
import { IoNotificationsCircle } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import Notification from "./Notification";
import SearchBox from "../SearchBox";
import { useSidebar } from "../../contexts/SidebarContext";
import Logo from "../header/Logo";
import { subscribeToVideoUploads } from "../../services/NotificationService";

export type NotificationData = {
  id: string;
  title: string;
  time: string;
  imgSrc: string;
};

const UserNav: React.FC = () => {
  const navigate = useNavigate();
  const { collapsed } = useSidebar();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const subscription = subscribeToVideoUploads(setNotifications);
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="relative flex items-center justify-between h-12 w-full px-4">
      {/* Left section with Logo (shown if sidebar is collapsed) */}
      {collapsed && (
        <div className="absolute left-4">
          <Logo />
        </div>
      )}

      {/* Centered Search Box */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <SearchBox />
      </div>

      <div className="absolute flex items-center space-x-4 right-0">
        <div
          className="w-[70px] h-12 cursor-pointer bg-transparent flex items-center justify-center border-l border-[#585a5c]"
          onClick={() => navigate("/aq-studio")}
        >
          <MdOutlineVideoCall size={28} className="text-white" />
        </div>
        <div className="relative" ref={notificationRef}>
          <div
            onClick={handleOpen}
            className="w-[70px] h-12 cursor-pointer bg-transparent flex items-center justify-center border-l border-[#585a5c]"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 absolute top-2 right-4"></span>
            <IoNotificationsCircle size={28} className="text-white" />
          </div>
          <Notification isOpen={isOpen} notifications={notifications} />
        </div>
        <div
          className="w-[70px] h-12 cursor-pointer bg-transparent flex items-center justify-center border-l border-[#585a5c]"
          onClick={() => navigate("/my-list")}
        >
          <MdOutlineAccountCircle size={28} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default UserNav;
