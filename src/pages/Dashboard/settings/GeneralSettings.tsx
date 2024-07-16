import React, { useState, useRef } from "react";
import { MdCameraAlt } from "react-icons/md";
import SelectBox from "../../../components/inputs/Select";
import BasicInfo from "./BasicInfo";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import { useTranslation } from 'react-i18next';

interface GeneralSettingsProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  currentAvatarUrl: string | undefined;
  onAvatarChange: (file: File) => void;
  onAvatarRemove: () => void;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  activeSection,
  onSectionChange,
  currentAvatarUrl,
  onAvatarChange,
  onAvatarRemove,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const options = [
    {
      value: "English",
      label: "English",
    },
    {
      value: "Japanese",
      label: "日本語",
    },
  ];

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

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const { t } = useTranslation();

  return (
    <div>
      {activeSection === "" && (
        <div>
          <div className="pb-4 border-b border-[#585a5c]">
            <div
              className="flex items-center justify-start cursor-pointer mb-5 px-8"
              onClick={handleAvatarClick}
            >
              <div
                className="avatar relative w-[100px] h-[100px] rounded-full bg-[#6b6b6b] flex items-center justify-center bg-cover bg-center"
                style={{
                  backgroundImage: currentAvatarUrl
                    ? `url(${currentAvatarUrl})`
                    : undefined,
                }}
              >
                <div className="icon-overlay">
                  <MdCameraAlt
                    size={24}
                    className="gray-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                  />
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <h6 className="text-3xl font-semibold text-white ml-3">
                Anna Nguyen
              </h6>
            </div>
            <h6 className="sub-2r text-white mb-3">
              {t("Your AQ account is only you can see.")}
            </h6>
            <p className="body-1r gray-200">{t("Signed in")} as xxx@gmail.com</p>
          </div>
          <div className="py-4 border-b border-[#585a5c]">
            <h6 className="text-white sub-2r mb-3">{t("Your Account")}</h6>
            <div className="flex flex-col gap-3">
              <div
                onClick={() => onSectionChange("basicInfo")}
                className="body-1r text-[#1570EF] underline cursor-pointer"
              >
                {t("Change your account basic info.")}
              </div>
              <div
                onClick={() => onSectionChange("changeEmail")}
                className="body-1r text-[#1570EF] underline cursor-pointer"
              >
                {t("Change your Email address.")}
              </div>
              <div
                onClick={() => onSectionChange("changePassword")}
                className="body-1r text-[#1570EF] underline cursor-pointer"
              >
                {t("Change your password.")}
              </div>
            </div>
          </div>
          <div className="py-4">
            <SelectBox
              options={options}
              value={selectedOption}
              onChange={setSelectedOption}
              label={t("Setting language")}
              border
              standard
            />
            {/* <p className="mt-4">Selected Option: {selectedOption}</p> */}
          </div>
        </div>
      )}
      {activeSection === "basicInfo" && (
        <BasicInfo
          currentAvatarUrl={currentAvatarUrl}
          onAvatarChange={onAvatarChange}
          onAvatarRemove={onAvatarRemove}
        />
      )}
      {activeSection === "changeEmail" && <ChangeEmail />}
      {activeSection === "changePassword" && <ChangePassword />}
    </div>
  );
};

export default GeneralSettings;
