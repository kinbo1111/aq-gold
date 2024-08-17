import React, { useState, useRef, useEffect, useContext } from "react";
import { useForm } from 'react-hook-form';
import Input from "../../../components/inputs/Input";
import { DefaultAvatar } from '../../../const';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../../contexts/UserContext';

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

    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("userContext must be used within an AuthProvider!")
    }
    const { user } = userContext;
    const [name, setNickname] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string | undefined>(currentAvatarUrl);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false); // null: loading, true: loaded, false: error
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();

    const handleImageLoad = () => {
        setIsLoaded(true);
    };

    const handleImageError = () => {
        setIsLoaded(false);
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
        handleSubmit,
        formState: { errors },
    } = useForm();


    return (
        <div>
            <h5 className="sub-1b text-white mb-4">{t("Account basic info")}</h5>
            <div className="pb-6 border-b border-[#585a5c]">
                <div>
                    <div className="flex items-center justify-start gap-6">
                        <img 
                            src={selectedFile? currentAvatarUrl : imageUrl} 
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            alt="Current Avatar" 
                            className="avatar relative w-[100px] h-[100px] rounded-full bg-[#6b6b6b] flex items-center justify-center bg-cover bg-center"
                            style={{ maxWidth: '100px', maxHeight: '100px' }} 
                        />
                        <div>
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
                    placeholder="Maruko"
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
