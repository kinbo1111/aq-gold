import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../../components/inputs/Input";
import Button from "../../../components/Button";
import AvatarUpload from "./AvatarUpload";
import { useTranslation } from 'react-i18next';
import { API, Storage } from 'aws-amplify';
import { createChannel } from '../../../graphql/mutations';
import { uploadChannelAvatar } from '../../../services/storageService';
import { message } from "antd";

const CreateChannel = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useForm();
  const avatarUploadRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const onFileSelect = (file: File | null) => setSelectedFile(file);
  const handleClose = () => navigate('/aq-channel');

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarFile(e.target.files[0]);
    }
  };
  const handleCreateChannel = async () => {
    try {
      if (!name || !avatarFile) {
        setError('Name and avatar are required.');
        return;
      }

      const avatarUrl = await uploadChannelAvatar(avatarFile.name, avatarFile);

      await API.graphql({
        query: createChannel,
        variables: {
          input: {
            name,
            description,
            avatarUrl,
            subscribersCount: 0,
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });

      message.success('Channel created successfully!');
    } catch (error: any) {
      message.warning('Error creating channel: ' + error.message);
    }
  };


  return (
    <div className="relative w-full flex items-center justify-center py-24">
      <div className="max-w-[800px] w-11/12 md:w-5/6 lg:w-3/5 b-brand-50 rounded-lg p-12">
        <button
          onClick={handleClose}
          className="text-white hover:opacity-90 focus:outline-none relative top-[-20px] left-[700px] w-8 h-8 rounded-full b-gray-300 z-20 flex items-center justify-center transition-opacity"
        >
          &times;
        </button>
        <h6 className="sub-1b gray-800 mb-7 text-center">
          {t("Create your AQvr channel")}
        </h6>
        <AvatarUpload ref={avatarUploadRef} onFileSelect={onFileSelect} />
        <form className="flex flex-col gap-8 mt-6">
          <Input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            label={t("Channel name")}
            placeholder="マルコ"
            register={register}
            errors={errors}
            small
            background
            required
          />
          <Input
            id="handle"
            type="text"
            label={t("Handle")}
            placeholder="＠"
            register={register}
            errors={errors}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            small
            background
            required
          />
          <div>
            <div className="flex items-center justify-center body-1r text-black">
              {t("By clicking Create Channel you agree to")}
              <Link
                to="/terms"
                className="body-1r text-[#1570EF] underline ml-1"
              >
                {t("AQ GOLD’s Terms of Service.")}
              </Link>
            </div>
            <div className="flex items-center justify-center body-1r text-black">
             {t("Changes made to your name and profile picture are visible on AQ GOLD.")}
              <Link
                to="learn-more"
                className="body-1r text-[#1570EF] underline ml-1"
              >
                {t("Learn more")}
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button
              label={t("Create Channel")}
              onClick={handleCreateChannel}
              disabled={!selectedFile}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChannel;
