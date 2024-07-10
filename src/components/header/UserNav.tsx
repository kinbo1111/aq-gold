import React, {useState} from "react";
import { MdOutlineVideoCall } from "react-icons/md";
import { IoNotificationsCircle } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import Notification from "./Notification";

const UserNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div>
            <div className="relative flex items-center justify-start">
                <div className="w-[70px] h-10 cursor-pointer b-gray-700 flex items-center justify-center border-l border-[#585a5c]"><MdOutlineVideoCall size={24} className="text-white"/></div>
                <div className="relative">
                    <div onClick={handleOpen} className="w-[70px] h-10 cursor-pointer b-gray-700 flex items-center justify-center border-l border-[#585a5c]"><IoNotificationsCircle size={24} className="text-white"/></div>
                    <Notification isOpen={isOpen}/>
                </div>
                <div className="w-[70px] h-10 cursor-pointer b-gray-700 flex items-center justify-center border-l border-r border-[#585a5c]"><MdOutlineAccountCircle size={24} className="text-white"/></div>
            </div>
            
        </div>
    );
};

export default UserNav;