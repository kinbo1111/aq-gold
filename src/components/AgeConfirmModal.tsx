import React, { useEffect } from "react";

import Button from "./Button";
import SettingsModalHeader from "../pages/Dashboard/settings/SettingsModalHeader";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export type AgeConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onVisible: () => void;
}

const AgeConfirmModal: React.FC<AgeConfirmModalProps> = ({ isOpen, onClose,  onVisible }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();


  const handleClick = () => {
    navigate('/category/aq18');
    onVisible()
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onVisible()
      navigate('/category/aq18');    
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
    
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-85">
      <div className="relative flex items-center justify-center w-full">
        <div className="max-w-[480px] w-full b-gray-600 rounded-[10px] flex items-center justify-center flex-col">
          <SettingsModalHeader
            onClose={onClose}
            showCloseButton={true}
            label={t("Are you 18 years of age or older?")}
          />
          <div className="p-6">
            <p className="text-white body-1r text-center">
              {t("tenth")}
            </p>
          </div>
          <div className="w-full relative flex items-center justify-end px-6 py-2 gap-2 border-t border-[#585a5c]">
            <Button
              onClick={onClose}
              label={t("No")}
              outline
              full
              small
            />
            <Button onClick={handleClick} label={t("Enter")} full small />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeConfirmModal;
