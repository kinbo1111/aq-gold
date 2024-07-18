import React from "react";
import Button from "../../../components/Button";
import { useTranslation } from "react-i18next";
interface SettingsFooterProps {
  onClose: () => void;
  activeChannel?: string;
  activeSection?: string;
  isDelete?: boolean; 
  isDisable?: boolean;
}

const SettingsFooter: React.FC<SettingsFooterProps> = ({
  onClose,
  activeChannel,
  isDelete = false, 
  isDisable = true
}) => {
  const { t } = useTranslation();
  let leftButtonLabel = activeChannel === "channel" ? t("back") : t("cancel");
  let rightButtonLabel = activeChannel === "channel" ? t("publish") : t("save");

  if (isDelete) {
    leftButtonLabel = t("Cancel");
    rightButtonLabel = t("Delete");
  }

  return (
    <div className="w-full relative flex items-center justify-end px-6 py-2 gap-2 border-t border-[#585a5c]">
      <Button disabled={isDisable} onClick={onClose} label={leftButtonLabel} outline full small />
      <Button disabled={isDisable} onClick={() => {}} label={rightButtonLabel} full small />
    </div>
  );
};

export default SettingsFooter;
