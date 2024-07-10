import * as React from "react";

interface SettingsModalHeaderProps {
  onClose: () => void;
  label: string;
  showCloseButton?: boolean;
}

const SettingsModalHeader: React.FC<SettingsModalHeaderProps> = ({
  onClose,
  label,
  showCloseButton = true,
}) => {
  return (
    <div className="relative w-full py-[10px] px-6 flex items-center justify-start border-b border-[#585a5c]">
      <h6 className="sub-1b text-white">{label}</h6>
      {showCloseButton && (
        <button
          onClick={onClose}
          className="close-button gray-200 absolute top-1/2 right-6 -translate-y-1/2 text-3xl font-normal"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default SettingsModalHeader;
