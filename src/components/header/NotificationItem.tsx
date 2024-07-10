import React from "react";

interface NotificationItemProps {
    imgSrc: string;
    title: string;
    time: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
    imgSrc,
    title,
    time
}) => {
    return (
        <div className="relative w-full py-2 border-b border-[#585a5c] flex items-center justify-start gap-2">
            <img src={imgSrc} alt="" className="w-[130px] h-auto rounded-lg" />
            <div>
                <h6 className="gray-50 body-1r mb-2">{title}</h6>
                <p className="body-2r gray-200">{time}</p>
            </div>
        </div>
    );
};

export default NotificationItem;