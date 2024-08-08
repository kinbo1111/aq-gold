import React, { useContext } from "react";
import { RxExit } from "react-icons/rx";
import { useTranslation } from 'react-i18next';
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

interface SettingsModalSidebarProps {
    setActiveChannel: (channel: string) => void;
    activeChannel: string;
}


const SettingsModalSidebar: React.FC<SettingsModalSidebarProps> = ({ setActiveChannel, activeChannel }) => {

    const { t } = useTranslation();
    const navigate = useNavigate()
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("userContext must be used within an AuthProvider!")
    }
    const { logout } = userContext;

    const handleSignOut = async () => {
        await logout();
        navigate('/')
    }

    const getClassNames = (channel: string) => {
        return `body-1r gray-200 hover:text-white py-[10px] px-3 rounded cursor-pointer hover:bg-[#191b1c] ${activeChannel === channel ? 'bg-[#191b1c]' : ''}`;
    };

    return (
        <div className="py-6 px-2 relative w-full h-full">
            <div onClick={() => setActiveChannel("general")} className={getClassNames("general")}>
                {t("General")}
            </div>
            <div onClick={() => setActiveChannel("channel")} className={getClassNames("channel")}>
                {t("Customize AQvr channel")}
            </div>
            <div onClick={() => setActiveChannel("advanced")} className={getClassNames("advanced")}>
                {t("Advanced settings")}
            </div>
            <div onClick={() => { }} className="py-2 px-3 absolute bottom-6 left-2 flex items-start justify-start">
                <RxExit size={16} className="brand-600" />
                <a className="button-3b brand-600 ml-1 cursor-pointer" onClick={handleSignOut}>{t("Sign out")}</a>
            </div>
        </div>
    );
};

export default SettingsModalSidebar;
