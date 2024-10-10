import React, { useState, useRef, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { DefaultAvatar } from '../../../const';
import Input from "../../../components/inputs/Input";
import { useTranslation } from "react-i18next";
import { useChannel } from "../../../contexts/ChannelContext";

interface ChannelSettingsProps {
    channelAvatar?: string;
    onChannelHandle: (channelHandle: string) => void;
    onChannelName: (channelName: string) => void;
    onAvatarChange: (file: File) => void;
    onAvatarRemove: () => void;
}

const ChannelSettings: React.FC<ChannelSettingsProps> = ({
    onAvatarChange,
    onChannelHandle,
    onChannelName,
    onAvatarRemove
}) => {
    
    const { t } = useTranslation();
    const { channelData } = useChannel();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | undefined>('');
    const [channelName, setChannelName] = useState<string>('');
    const [channelHandle, setChannelHandle] = useState<string>('');
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { register, formState: { errors } } = useForm();
    const handleImageLoad = () => setIsLoaded(true);
    const handleImageError = () => setIsLoaded(false);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            onAvatarChange(file);
        }
    };

    const handleRemoveClick = () => {
        setSelectedFile(null);
        onAvatarRemove();
    };

    const triggerFileInput = () => fileInputRef.current?.click();

    useEffect(() => {
        if (!isLoaded && selectedFile) {
            setImageUrl(DefaultAvatar)
        }
    }, [isLoaded])

    useEffect(() => {
        onChannelHandle(channelHandle);
        onChannelName(channelName);
    }, [channelHandle, channelName, onChannelHandle, onChannelName]);

    useEffect(() => {
        if (channelData !== null) {
            setChannelName(channelData?.name)
            setChannelHandle(channelData?.description)  
            setImageUrl(channelData?.avatarUrl)
        }
    },[channelData])

    return (
        <div>
            <h5 className="sub-1b text-white mb-4">{t("Your AQvar Channel")}</h5>
            <div className="pb-6 border-b border-[#585a5c]">
                <h6 className="sub-2r text-white mb-2">{t("Picture")}</h6>
                <p className="body-1r text-white mb-4">
                    {t("Your channel picture will appear where your channel is presented on AQ GOLD, like next to your videos.")}
                </p>
                <div className="grid grid-cols-12">
                    <div className="col-span-3 space-x-1">
                        <img 
                            src={selectedFile? URL.createObjectURL(selectedFile) : imageUrl} 
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            alt="Current Avatar" 
                            className="w-[100px] h-[100px] rounded-full object-cover bg-[#6b6b6b]"
                        />
                    </div>
                    <div className="col-span-9">
                        <p className="text-white body-1r mb-3">{t("eleven")}</p>
                        <div>
                            <button onClick={triggerFileInput} className="py-3 px-4 brand-600 button-2b">
                                {t("Change")}
                            </button>
                            <button onClick={handleRemoveClick} className="py-3 px-4 brand-600 button-2b">
                                {t("Remove")}
                            </button>
                        </div>
                    </div>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </div>
            <div className="py-3 flex flex-col gap-3">
                <h6 className="sub-2r text-white">{t("Your Channel")}</h6>
                <Input
                    id="channelName"
                    label={t("Channel Name")}
                    type="text"
                    onChange={(e) => setChannelName(e.target.value)}
                    value={channelName}
                    register={register}
                    errors={errors}
                    required
                    small
                />
                <Input
                id="handle"
                label={t("Handle")}
                type="text"
                onChange={(e) => {
                    const value = e.target.value;
                    if (!value.startsWith("@")) {
                    setChannelHandle("@" + value);
                    } else {
                    setChannelHandle(value);
                    }
                }}
                value={channelHandle}
                register={register}
                errors={errors}
                required
                small
                />
            </div>
        </div>
    );
};

export default ChannelSettings;
