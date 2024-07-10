import React from "react";
import NotificationItem from "./NotificationItem";
import { NotificationData } from "../../utils/content";
import { MdOutlineArrowDropUp } from "react-icons/md";

import { title } from "process";

interface NotificationProps {
    isOpen: boolean;
}

const Notification: React.FC<NotificationProps> = ({
    isOpen
}) => {
    return(
        <div>
            {isOpen && (
                <div className="absolute top-[55px] right-0 transition">
                    <div className="absolute top-[-14px] right-[13px]"><MdOutlineArrowDropUp size={24} className="brand-600"/></div>
                    <div className="notification w-[400px] max-h-[600px] b-gray-700 overflow-y-scroll px-4 py-1 rounded-lg border border-[#c7a76b] z-50">
                        {NotificationData.map ((item, index) => (
                            <NotificationItem
                                imgSrc={item.imgSrc}
                                title= {item.title}
                                time= {item.time}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notification;