import React, { useState, useRef } from "react";
import Button from "../../../components/Button";
import { HiClipboardDocument } from "react-icons/hi2";
import { useTranslation } from 'react-i18next';
import { message } from "antd";

export type VideoUploadScheduleProps = {
  videoUrl: string;
  videoScheduleTime: string;
  videoTitle: string;
  thumbnailUrl: string;
  publishNow: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const VideoUploadSchedule: React.FC<VideoUploadScheduleProps> = ({
  videoUrl,
  thumbnailUrl,
  videoScheduleTime,
  videoTitle,
  publishNow,
  isOpen,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputClick = () => {
    setSelectedFile(null);
  };

  const handleCopy = (fieldId: string) => {
    const textarea = document.createElement('textarea');
    const field = document.getElementById(fieldId);

    if (!field) return;

    textarea.value = field.textContent as string;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
     message.success(`${t('copied to clipboard!')}`);
  };

  if (!isOpen) {
    return null;
  }

  return (
      <div className="relative flex items-center justify-center w-full mt-[180px]">
          <div className="max-w-[530px] w-full b-gray-600 rounded-[10px] flex items-start justify-start flex-col">
              <div className="relative w-full py-[10px] px-6 flex items-center justify-start border-b border-[#585a5c]">
                  <h6 className="sub-1b text-white">{videoTitle}</h6>
                  <button
                      onClick={onClose}
                      className="close-button gray-200 absolute top-1/2 right-6 -translate-y-1/2 text-3xl font-normal"          
                  >
                      &times;
                  </button>
              </div>
              <div className="py-4 flex items-start justify-start flex-col px-5 w-full">
              {!publishNow ?
                <p className="text-white justify-start">{t("This video will be published ")}{videoScheduleTime.slice(0, 4)}{t("年")} {videoScheduleTime.slice(5, 7)}{t("月")}{videoScheduleTime.slice(8, 10)} {videoScheduleTime.slice(11, 16)}{t("に公開に設定されます")}</p>
            :<p className="text-white justify-start">{t("If it has already been published, see the image below.")}</p>
                }  
                  <div className="p-5 flex flex-row gap-10 bg-[#57595B] w-full rounded-md my-2">
                      <div className="">
                          <img src={thumbnailUrl} className="max-h-20" />
                      </div>
                      <div className="flex flex-col text-white">
                      <p className="text-sm">{videoTitle}</p>
                              <p className="text-[#A0A1A2] text-sm">{t("Upload Date")}: {videoScheduleTime.slice(0,4)}{t("年")} {videoScheduleTime.slice(5,7)}{t("月")}{videoScheduleTime.slice(8,10)}{t("日")}</p>
                      </div>
                  </div>
                  <div className="bg-[#2E3133] w-full rounded-md my-2 text-white p-5 text-sm" >
                      <p>{t("This video link is following:")}</p>
                  <a className="text-blue-500 underline" href={videoUrl}>{videoUrl}
                    <HiClipboardDocument
                            size={16}
                            className="gray-200 inline ml-2 transform cursor-pointer"
                            onClick={() => handleCopy(videoUrl)}
                     />
                 </a>
                  </div>
              </div>
              <div className="w-full relative flex items-center justify-end px-6 py-2 gap-2 border-t border-[#585a5c]">
                  <Button label={t("CLOSE")} onClick={onClose}  full small/>
              </div>
          </div>
      </div>
  );
};

export default VideoUploadSchedule;
