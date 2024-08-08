import React from "react";
import {Button} from "antd";
import { useTranslation } from "react-i18next";
import { TfiSave } from "react-icons/tfi";
interface SettingsFooterProps {
  onClose: () => void;
  handleSave: () => void;
  activeChannel?: string;
  activeSection?: string;
  isLoading?: boolean;
  isDelete?: boolean; 
  isDisable?: boolean;
}

const SettingsFooter: React.FC<SettingsFooterProps> = ({
  onClose,
  handleSave,
  isLoading,
  activeChannel,
  isDelete = false, 
  isDisable = true
}) => {
  const { t } = useTranslation();
  let leftButtonLabel = activeChannel === "channel" ? t("Back") : t("Cancel");
  let rightButtonLabel = activeChannel === "channel" ? t("Public") : t("Save");

  if (isDelete) {
    leftButtonLabel = t("Cancel");
    rightButtonLabel = t("Delete");
  }

  return (
    <div className="w-full relative flex items-center justify-end px-6 py-2 gap-2 border-t border-[#585a5c]">
      <Button
        className='btnClose w-[120px] flex-row bg-[#181A1B] border-[#DDB951] border-solid text-[#DDB951] button-1b h-10 relative disabled:cursor-not-allowed disabled:text-[#DDB951] rounded hover:bg-blue-500 transition px-4 py-2 flex items-center justify-center'
        disabled={isDisable}
        onClick={onClose}
      >
        {leftButtonLabel}
      </Button>
      <Button
        className='btnOk w-[120px] flex-row brand-gradient text-white border-none button-2b h-10 relative disabled:cursor-not-allowed disabled:bg-[#ceac02] disabled:text-gray-00 rounded  transition px-4 py-2 flex items-center justify-center'
        disabled={isDisable}
        icon={<TfiSave />}
        onClick={handleSave}
        loading={isLoading} >
        {rightButtonLabel}
      </Button>
    </div>
  );
};

export default SettingsFooter;
