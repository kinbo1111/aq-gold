import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../../components/inputs/Input";
import { Button } from "antd";
import { useTranslation } from 'react-i18next';
import { DefaultAvatar } from '../../../const';
import { useChannel } from "../../../contexts/ChannelContext";
import { useUser } from "../../../contexts/UserContext";
import { getVideoUrl, uploadChannelAvatar } from '../../../services/storageService';
import { message } from "antd";

const CreateChannel = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useForm();

  const { channelData, hasChannel, createChannel } = useChannel();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClose = () => navigate('/');
  const handleImageLoad = () => setIsLoaded(true);
  const handleImageError = () => setIsLoaded(false);

  useEffect(() => {
    if (!isLoaded) {
        setImageUrl(DefaultAvatar)
    }
  }, [isLoaded])
  
  const handleChangeClick = () => {
    if (fileInputRef.current) {
        fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        setSelectedFile(file);
        const url = await URL.createObjectURL(file);
        setImageUrl(url);
      }
  };

  const handleCreateChannel = async () => {
    setIsLoading(true);
    try {
      if (!name || !selectedFile) {
        message.warning('Name and avatar are required.');
        return;
      }

      const avatarUrl = await uploadChannelAvatar(selectedFile?.name, selectedFile);
      const newChannel = {
        name,
        description,
        avatarUrl: getVideoUrl(avatarUrl),
        subscribersCount: 0,
      };
      await createChannel(newChannel);
      message.success('Channel created successfully!');
      navigate('/aq-studio');
    } finally {
      setIsLoading(false);
    }
  };
  
    if (hasChannel) {
    return (
      <div>
        <h1>{channelData.name}</h1>
        <p>{channelData.description}</p>
      </div>
    );
  }


  return (
    <div className="relative w-full flex items-center justify-center py-24">
      <div className="max-w-[800px] w-11/12 md:w-5/6 lg:w-3/5 b-brand-50 rounded-lg p-12 relative">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-white hover:opacity-90 focus:outline-none w-8 h-8 rounded-full b-gray-300 z-20 flex items-center justify-center transition-opacity"
        >
          &times;
        </button>
        <h6 className="sub-1b gray-800 mb-7 text-center">
          {t("Create your AQvar channel")}
        </h6>
        <div>
          <div className="flex flex-col items-center justify-center gap-6">
              <img 
                  src={selectedFile ? imageUrl : DefaultAvatar } 
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  alt="Current Avatar" 
                  className="rounded-full w-52 h-52 cursor-pointer shadow-md shadow-gray-400"
                  onClick={handleChangeClick}
            />
            <a className="text-blue-500 underline text-center cursor-pointer" onClick={handleChangeClick}>{ t('Select Picture')}</a>
          </div>
          <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
          />
          
        </div>
        <div className="flex flex-col gap-8 mt-6">
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
             onChange={(e) => {
                    const value = e.target.value;
                    if (!value.startsWith("@")) {
                    setDescription("@" + value);
                    } else {
                    setDescription(value);
                    }
                }}
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
              className='w-[320px] btnOk flex-row brand-gradient text-gray-200 border-none button-2b h-10 relative disabled:cursor-not-allowed rounded hover:opacity-80 transition px-4 py-2 flex items-center justify-center'
              loading={isLoading}
              disabled={!selectedFile}
              onClick={handleCreateChannel}
            >
              {t("Create Channel")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChannel;
