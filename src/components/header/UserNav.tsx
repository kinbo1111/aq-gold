import React, { useState, useRef, useEffect} from "react";
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
}

const UserNav = () => {
    const navigate = useNavigate();
    const { collapsed } = useSidebar();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const notificationRef = useRef<HTMLDivElement | null>(null);
    const [notifications, setNotifications] = useState<NotificationData[]>([]);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if ( notificationRef.current &&
                !notificationRef.current.contains(event.target as Node)) {
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
        <div className="flex flex-row">
            {collapsed &&
                <div className="absolute left-20">
                    <Logo />
                </div>
            }
            <div className="relative flex items-center justify-center h-12">
                <div className="flex items-center justify-center ml-80 mr-7">
                    <SearchBox/>
                </div>
                <div
                    className="w-[70px] h-12 cursor-pointer bg-transparent flex items-center justify-center border-l border-[#585a5c]"
                    onClick={() => navigate("/aq-studio")}
                >
                    <MdOutlineVideoCall size={28} className="text-white" />
                </div>
                <div className="relative" ref={notificationRef}>
                    <div onClick={handleOpen} className="w-[70px] h-12 cursor-pointer bg-transparent flex items-center justify-center border-l border-[#585a5c]">
                        <span className="w-2 h-2 rounded-full bg-red-500 relative bottom-2 left-7"></span>
                        <IoNotificationsCircle size={28} className="text-white" />
                    </div>
                    <Notification isOpen={isOpen} notifications={notifications}/>
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