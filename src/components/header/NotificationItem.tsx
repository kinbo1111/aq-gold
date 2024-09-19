import React from "react";

interface NotificationItemProps {
  imgSrc: string;
  title: string;
  time: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ imgSrc, title, time }) => {
  return (
    <div className="flex items-center py-2 rounded-lg cursor-pointer">
      <img src={imgSrc} alt={title} className="w-12 h-12 rounded-sm" />
      <div className="ml-4">
        <h4 className="text-white font-medium">{'"'+ title + '" is uploaded at following time.'}</h4>
        <p className="text-gray-400 text-sm">{time.slice(0,10) + ' ' + time.slice(11,16) + ''}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
