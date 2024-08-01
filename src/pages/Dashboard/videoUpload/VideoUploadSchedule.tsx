import React, { useState, useRef } from "react";
import Button from "../../../components/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadedImg from '../../../assets/images/Image.png'
import { useTranslation } from 'react-i18next';

interface VideoUploadScheduleProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoUploadSchedule: React.FC<VideoUploadScheduleProps> = ({
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



  if (!isOpen) {
    return null;
  }

  return (
    
      <div className="relative flex items-center justify-center w-full mt-[180px]">
          <div className="max-w-[530px] w-full b-gray-600 rounded-[10px] flex items-start justify-start flex-col">
              <div className="relative w-full py-[10px] px-6 flex items-center justify-start border-b border-[#585a5c]">
                  <h6 className="sub-1b text-white">{t("Title")}</h6>
                  <button
                      onClick={onClose}
                      className="close-button gray-200 absolute top-1/2 right-6 -translate-y-1/2 text-3xl font-normal"          
                  >
                      &times;
                  </button>
              </div>
              <div className="py-4 flex items-start justify-start flex-col px-5 w-full">
                  <p className="text-white justify-start">この動画は2024年7月16日に公開に設定されます</p> 
                  <div className="p-5 flex flex-row gap-10 bg-[#57595B] w-full rounded-md my-2">
                      <div className="">
                          <img src={uploadedImg} className="max-h-20" />
                      </div>
                      <div className="flex flex-col text-white">
                              <p className="text-sm">Video Title</p>
                              <p className="text-[#A0A1A2] text-sm">アップロード日:2024年7月16日</p>
                      </div>
                  </div>
                  <div className="bg-[#2E3133] w-full rounded-md my-2 text-white p-5 text-sm" >
                      <p>動画リンク</p>
                      <a className="text-blue-500 underline">Here is a link.</a>  
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
