import SettingsFooter from "./SettingsFooter";
import SettingsModalHeader from "./SettingsModalHeader";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

interface DeleteChannelProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteChannel: React.FC<DeleteChannelProps> = ({ isOpen, onClose }) => {
  const [check, setCheck] = useState(true);
  const { t } = useTranslation();
  if (!isOpen) return null;

  const handleChange = () => {
    setCheck(!check)
  }
  const handleSave = () => {
    console.log("deleted!")
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999] bg-black bg-opacity-70">
      <div className="relative flex items-center justify-center w-full">
        <div className="max-w-[420px] w-full b-gray-600 rounded-[10px] flex items-center justify-center flex-col">
          <SettingsModalHeader
            onClose={onClose}
            showCloseButton={true}
            label={t("Confirm delete AQvr channel")}
          />
          <div className="p-3">
            <p className="text-white body-1r">
              <Checkbox sx={{ color: '#9fa0a1', borderRadius: '4px', '&.Mui-checked': { color: '#9fa0a1' } }} value={check} onChange={handleChange} /> {t("Are you sure you want to delete your AQvr channel?")}
              <br />
              <br />
              <div className="pl-3">
              {t("All data on your AQvr channel including uploaded videos are completely deleted.")}
              </div>
            </p>
          </div>
          <SettingsFooter onClose={onClose} isDelete isDisable={check} handleSave={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default DeleteChannel;
