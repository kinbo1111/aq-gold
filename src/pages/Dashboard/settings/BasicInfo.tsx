import React, { useState, useRef, useEffect } from "react";
import { useForm } from 'react-hook-form';
import Input from "../../../components/inputs/Input";
import { DefaultAvatar } from '../../../const';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../contexts/UserContext';

export type BasicInfoProps = {
    nickname?: string;
    currentAvatarUrl?: string;
    onAvatarChange: (file: File) => void;
    onAvatarRemove: () => void;
    onChangeNickname: (nickname: string) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({
    nickname,
    currentAvatarUrl,
    onAvatarChange,
    onAvatarRemove,
    onChangeNickname
}) => {

    const { user } = useUser();
    const [name, setNickname] = useState<string | undefined>(nickname);
    const [imageUrl, setImageUrl] = useState<string | undefined>(currentAvatarUrl ? currentAvatarUrl : DefaultAvatar);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false); // null: loading, true: loaded, false: error
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();

    const handleImageLoad = () => {
        setIsLoaded(true);
    };

    const handleImageError = () => {
        setIsLoaded(false);
        setImageUrl(DefaultAvatar);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            onAvatarChange(file);
        }
    };

    const handleRemoveClick = () => {
        setSelectedFile(null);
        setImageUrl(DefaultAvatar)
        onAvatarRemove();
    };

    useEffect(() => {
        setNickname(nickname? nickname: "");          
    },[])

    useEffect(() => {
        if(name !== undefined)
        onChangeNickname && onChangeNickname(name)
    }, [name])
    
    useEffect(() => {
        if (!isLoaded && selectedFile) {
            setImageUrl(DefaultAvatar)
        }
    }, [isLoaded])
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value);
    const handleChangeClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const {
        register,
        formState: { errors },
    } = useForm();

    return (
        <div>
            <h5 className="sub-1b text-white mb-4">{t("Account basic info")}</h5>
            <div className="pb-6 border-b border-[#585a5c]">
                <div>
                    <div className="grid grid-cols-12">
                    <div className="col-span-3 space-x-1">
                       <img 
                            src={selectedFile? currentAvatarUrl : imageUrl} 
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            alt="Current Avatar" 
                            className="w-[100px] h-[100px] rounded-full bg-[#6b6b6b] items-center justify-center bg-cover bg-center"
                        />
                    </div>
                        <div className="col-span-9">
                            <p className="text-white body-1r mb-3">{t("It’s recommended to use a picture that’s at least 98 x 98 pixels and 4MB or less. Use a PNG or GIF (no animations) file.")} </p>
                            <div>
                                <button onClick={handleChangeClick} className="py-3 px-4 brand-600 button-2b">
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
            </div>
            <div className="py-3">
                <Input
                    id="username"
                    label={t("User Name")}
                    onChange={handleChange}
                    value={name}
                    type="text"
                    register={register}
                    errors={errors}
                    required
                    small
                />
            </div>
        </div>
    );
};

export default BasicInfo;
