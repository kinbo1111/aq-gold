import React from "react";
import NotificationItem from "./NotificationItem";
import { MdOutlineArrowDropUp } from "react-icons/md";

interface NotificationProps {
  isOpen: boolean;
  notifications: NotificationData[];
}

interface NotificationData {
  id: string;
  title: string;
  time: string;
  imgSrc: string;
}

const Notification: React.FC<NotificationProps> = ({ isOpen, notifications }) => {
  return (
    <div>
      {isOpen && (
        <div className="absolute top-[55px] right-0 transition">
          <div className="absolute top-[-14px] right-[13px]">
            <MdOutlineArrowDropUp size={24} className="brand-600" />
          </div>
          <div className="notification w-[400px] max-h-[600px] b-gray-700 overflow-y-scroll px-4 py-1 rounded-lg border border-[#c7a76b] z-50">
            {notifications?.length > 0 ? (
              notifications?.map((item, index) => (
                <NotificationItem
                  key={index}
                  imgSrc={item.imgSrc}
                  title={item.title}
                  time={item.time}
                />
              ))
            ) : (
              <p className="text-white p-3">No new notifications</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
