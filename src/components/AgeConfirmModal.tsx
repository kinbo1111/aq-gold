import React from "react";

import Button from "./Button";
import SettingsModalHeader from "../pages/Dashboard/settings/SettingsModalHeader";

interface AgeConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AgeConfirmModal: React.FC<AgeConfirmModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-85">
      <div className="relative flex items-center justify-center w-full">
        <div className="max-w-[480px] w-full b-gray-600 rounded-[10px] flex items-center justify-center flex-col">
          <SettingsModalHeader
            onClose={onClose}
            showCloseButton={true}
            label="Are you 18 years of age or older?"
          />
          <div className="p-6">
            <p className="text-white body-1r text-center">
              You must be 18 years or older and agree to our Terms of Service to
              access and use this page. By clicking ENTER below, you certify
              that you are 18 years or older and that you accept our Terms of
              Service.
            </p>
          </div>
          <div className="w-full relative flex items-center justify-end px-6 py-2 gap-2 border-t border-[#585a5c]">
            <Button
              onClick={onClose}
              label="No"
              outline
              full
              small
            />
            <Button onClick={() => {}} label="Enter" full small />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeConfirmModal;
