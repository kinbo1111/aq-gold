import React from "react";
import Button from "../../../components/Button";

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
  let leftButtonLabel = activeChannel === "channel" ? "Back" : "Cancel";
  let rightButtonLabel = activeChannel === "channel" ? "Publish" : "Save";

  if (isDelete) {
    leftButtonLabel = "Cancel";
    rightButtonLabel = "Delete";
  }

  return (
    <div className="w-full relative flex items-center justify-end px-6 py-2 gap-2 border-t border-[#585a5c]">
      <Button disabled={isDisable} onClick={onClose} label={leftButtonLabel} outline full small />
      <Button disabled={isDisable} onClick={() => {}} label={rightButtonLabel} full small />
    </div>
  );
};

export default SettingsFooter;
