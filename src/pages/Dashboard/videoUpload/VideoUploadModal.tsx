import React, { useState, useRef } from "react";
import Button from "../../../components/Button";
import { FaCloudUploadAlt } from "react-icons/fa";

interface VideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

const VideoUploadModal: React.FC<VideoUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleSelectFile = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="relative flex items-center justify-center w-full mt-[180px]">
      <div className="max-w-[530px] w-full b-gray-600 rounded-[10px] flex items-center justify-center flex-col">
        <div className="relative w-full py-[10px] px-6 flex items-center justify-start border-b border-[#585a5c]">
          <h6 className="sub-1b text-white">Upload Video</h6>
          <button
            onClick={onClose}
            className="close-button gray-200 absolute top-1/2 right-6 -translate-y-1/2 text-3xl font-normal"
          >
            &times;
          </button>
        </div>
        <div className="modal-content pt-4 pb-14 flex items-center justify-center flex-col">
          <div className="flex items-center justify-center">
            <FaCloudUploadAlt size={48} className="text-white" />
          </div>
          <h6 className="text-white text-center mt-6 mb-3 sub-2r">
            Select a file or drag and drop here
          </h6>
          <p className="text-center gray-200 mb-6 sub-2r">
            Your videos will be private until you publish them
          </p>
          <Button
            label={selectedFile ? "Next" : "Select files"}
            onClick={selectedFile ? handleSelectFile : handleUploadClick}
            full
            small
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            onClick={handleFileInputClick}
            style={{ display: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoUploadModal;
