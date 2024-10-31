import { FiPlus } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const CreateChannelButton = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const handleCreateChannel = () => {
        navigate("/create-channel")
    }
    const fontSize = location.pathname === "/settings" ? "sm" : "xl";
    
    return (
        <a
            onClick={handleCreateChannel}
            className={`flex justify-center items-center cursor-pointer mt-20 py-3 text-blue-500 font-semibold underline transition-transform duration-200 ease-out hover:scale-105 text-nowrap hover:text-blue-700 active:scale-95 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-opacity-50 text-${fontSize}`}
        >
            {t("You do not have channel yet. Create AQvar Channel from here!")}
        </a>
    );
}

export default CreateChannelButton;