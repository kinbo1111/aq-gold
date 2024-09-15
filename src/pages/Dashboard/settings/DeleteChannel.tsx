import SettingsFooter from "./SettingsFooter";
import SettingsModalHeader from "./SettingsModalHeader";
import { Checkbox } from "@mui/material";
import { message } from "antd";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useChannel } from "../../../contexts/ChannelContext";
import { deleteChannelById } from '../../../services/ChannelService';
import { useNavigate } from "react-router-dom";

interface DeleteChannelProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteChannel: React.FC<DeleteChannelProps> = ({ isOpen, onClose }) => {
  const [check, setCheck] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { channelData } = useChannel();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = () => {
    setCheck(!check)
  }
  
  const handleDeleteChannel = async () => {
    setLoading(true);
    setError(null);

    try {
      await deleteChannelById(channelData.id);
      message.success("Channel deleted successfully!");
      navigate('/create-channel')
    } catch (err) {
      console.error('Error deleting channel:', err);
      message.warning("Failed to delete channel. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999] bg-black bg-opacity-70">
      <div className="relative flex items-center justify-center w-full">
        <div className="max-w-[420px] w-full b-gray-600 rounded-[10px] flex items-center justify-center flex-col">
          <SettingsModalHeader
            onClose={onClose}
            showCloseButton={true}
            label={t("Confirm delete AQvar channel")}
          />
          <div className="p-3">
            <p className="text-white body-1r">
              <Checkbox sx={{ color: '#9fa0a1', borderRadius: '4px', '&.Mui-checked': { color: '#9fa0a1' } }} value={check} onChange={handleChange} /> {t("Are you sure you want to delete your AQvar channel?")}
              <br />
              <br />
              <div className="pl-3">
              {t("All data on your AQvar channel including uploaded videos are completely deleted.")}
              </div>
            </p>
          </div>
          <SettingsFooter onClose={onClose} isDelete isDisable={check} handleSave={handleDeleteChannel} isLoading={loading} />
        </div>
      </div>
    </div>
  );
};

export default DeleteChannel;
