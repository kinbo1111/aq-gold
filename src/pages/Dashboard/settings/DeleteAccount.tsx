import React, { useState } from 'react';
import SettingsFooter from "./SettingsFooter";
import SettingsModalHeader from "./SettingsModalHeader";
import { Checkbox } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { message } from "antd";
import { Auth } from 'aws-amplify';
import { useNavigate } from "react-router-dom";
import { useUser } from '../../../contexts/UserContext';

interface DeleteAccountProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [check, setCheck] = useState(true);
  const [loading, setLoading] = useState(false);
  const { setUnAuth } = useUser()
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  if (!isOpen) return null;
  const handleChange = () => {
    setCheck(!check)
  }


  const handleDeleteAccount = async () => {
    setLoading(true);
    setError(null);

    try {
      await Auth.deleteUser();
      message.success("Account deleted successfully!");
      setUnAuth();
      navigate('/');
    } catch (err) {
      console.log("Error deleting account:", err);
      message.warning("Failed to delete account. Please try again.");
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
            label={t("Confirm delete AQ account")}
          />
          <div className="p-3">
            <p className="text-white body-1r">
              <Checkbox sx={{ color: '#9fa0a1', borderRadius: '4px', '&.Mui-checked': { color: '#9fa0a1' } }} value={check} onChange={handleChange} />
              {t("Are you sure you want to delete your AQ account?")}
              <br />
              <br />
              <div className="pl-3">
                {t("All data on your AQ account including AQvar channel are completely deleted.")}
              </div>
            </p>
          </div>
          <SettingsFooter onClose={onClose} isDelete isDisable={check} handleSave={handleDeleteAccount} isLoading={loading} />
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
