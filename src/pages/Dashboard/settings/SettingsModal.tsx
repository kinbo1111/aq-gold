import React, { useState } from "react";
import SettingsModalHeader from "./SettingsModalHeader";
import SettingsModalSidebar from "./SettingsModalSidebar";
import GeneralSettings from "./GeneralSettings";
import SettingsFooter from "./SettingsFooter";
import ChannelSettings from "./ChannelSettings";
import AdvancedSettings from "./AdvancedSettings";
import { useTranslation } from "react-i18next";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [image, setImage] = useState<string | null>(null);
  const { t } = useTranslation();
  const [activeChannel, setActiveChannel] = useState<string>("general");
  const [activeSection, setActiveSection] = useState<string>("");

  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | undefined>(
    undefined
  );

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarChange = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setCurrentAvatarUrl(imageUrl);
  };

  const handleAvatarRemove = () => {
    setCurrentAvatarUrl(undefined);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="relative flex items-center justify-center w-full mt-[60px]">
      <div className="max-w-[850px] w-full b-gray-600 rounded-[10px] flex items-center justify-center flex-col">
        <SettingsModalHeader onClose={onClose} showCloseButton={false} label={t("Settings")} />
        <div className="relative w-full flex justify-between">
          <div className="w-[30%]">
            <SettingsModalSidebar setActiveChannel={setActiveChannel} activeChannel={activeChannel} />
          </div>
          <div className="w-[70%] py-4 px-6 min-h-[550px] border-l border-[#585a5c]">
            {activeChannel === "general" && (
              <GeneralSettings
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                currentAvatarUrl={currentAvatarUrl}
                onAvatarChange={handleAvatarChange}
                onAvatarRemove={handleAvatarRemove}
              />
            )}
            {activeChannel === "channel" && (
              <ChannelSettings
                currentAvatarUrl={currentAvatarUrl}
                onAvatarChange={handleAvatarChange}
                onAvatarRemove={handleAvatarRemove}
              />
            )}
            {activeChannel === "advanced" && <AdvancedSettings />}
          </div>
        </div>
        {(activeChannel==="channel" || activeSection === "basicInfo" || activeSection === "changeEmail" || activeSection === "changePassword") && (
          <SettingsFooter onClose={onClose} activeChannel={activeChannel} />
        )}
      </div>
    </div>
  );
};

export default SettingsModal;
