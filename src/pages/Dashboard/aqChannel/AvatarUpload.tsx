import React, { useState, ChangeEvent, forwardRef, useImperativeHandle } from 'react';
import { Avatar } from '@mui/material';
import DefaultAvatar from '../../../assets/images/default_avatar.png';

interface AvatarUploadProps {
  onFileSelect: (file: File | null) => void;
}

const AvatarUpload = forwardRef(({ onFileSelect }: AvatarUploadProps, ref) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    getSelectedFile: () => selectedFile,
  }));

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="avatar-upload mx-auto flex items-center justify-center flex-col">
      <div className="avatar-preview w-[210px] h-[210px] bg-white rounded-full flex items-center justify-center mb-6">
        <Avatar
          src={preview || DefaultAvatar}
          alt="Avatar Preview"
          sx={{ width: 200, height: 200 }}
        />
      </div>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="icon-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="icon-button-file">
        <p className="text-[20px] text-[#1570EF] underline cursor-pointer">Select picture</p>
      </label>
    </div>
  );
});

export default AvatarUpload;
