import React from "react";
import { RxExit } from "react-icons/rx";

interface SettingsModalSidebarProps {
    setActiveChannel: (channel: string) => void;
    activeChannel: string;
}

const SettingsModalSidebar: React.FC<SettingsModalSidebarProps> = ({ setActiveChannel, activeChannel }) => {
    const getClassNames = (channel: string) => {
        return `body-1r gray-200 hover:text-white py-[10px] px-3 rounded cursor-pointer hover:bg-[#191b1c] ${activeChannel === channel ? 'bg-[#191b1c]' : ''}`;
    };

    return (
        <div className="py-6 px-2 relative w-full h-full">
            <div onClick={() => setActiveChannel("general")} className={getClassNames("general")}>
                General
            </div>
            <div onClick={() => setActiveChannel("channel")} className={getClassNames("channel")}>
                Customize AQvr channel
            </div>
            <div onClick={() => setActiveChannel("advanced")} className={getClassNames("advanced")}>
                Advanced settings
            </div>
            <div onClick={() => { }} className="py-2 px-3 absolute bottom-6 left-2 flex items-start justify-start">
                <RxExit size={16} className="brand-600" />
                <p className="button-3b brand-600 ml-1">Sign out</p>
            </div>
        </div>
    );
};

export default SettingsModalSidebar;
