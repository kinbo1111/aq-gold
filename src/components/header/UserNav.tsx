import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineVideoCall } from "react-icons/md";
import { IoNotificationsCircle } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import Notification from "./Notification";

const UserNav = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div>
            <div className="relative flex items-center justify-start">
                <div
                    className="w-[70px] h-10 cursor-pointer b-gray-700 flex items-center justify-center border-l border-[#585a5c]"
                    onClick={() => navigate("/aq-studio")}
                >
                    <MdOutlineVideoCall size={28} className="text-white" />
                </div>
                <div className="relative">
                    <div onClick={handleOpen} className="w-[70px] h-10 cursor-pointer b-gray-700 flex items-center justify-center border-l border-[#585a5c]">
                        <span className="w-2 h-2 rounded-full bg-red-500 relative bottom-2 left-7"></span>
                        <IoNotificationsCircle size={28} className="text-white" />
                    </div>
                    <Notification isOpen={isOpen}/>
                </div>
                <div
                    className="w-[70px] h-10 cursor-pointer b-gray-700 flex items-center justify-center border-l border-r border-[#585a5c]"
                    onClick={() => navigate("/my-list")}
                >
                    <MdOutlineAccountCircle size={28} className="text-white" /></div>
            </div>
            
        </div>
    );
};

export default UserNav;