import React, { useState, useRef } from "react";
import { useForm } from 'react-hook-form';
import DefaultAvatarUrl from "../../../assets/images/default_avatar.png";
import Input from "../../../components/inputs/Input";

interface BasicInfoProps {
    currentAvatarUrl?: string;
    onAvatarChange: (file: File) => void;
    onAvatarRemove: () => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({
    currentAvatarUrl,
    onAvatarChange,
    onAvatarRemove
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
            <h5 className="sub-1b text-white mb-4">Account basic info</h5>
            <div className="pb-6 border-b border-[#585a5c]">
                <div>
                    <div className="flex items-center justify-start gap-6">
                        <img 
                            //   src={currentAvatarUrl || DefaultAvatarUrl} 
                            src={DefaultAvatarUrl} 
                            alt="Current Avatar" 
                            style={{ maxWidth: '100px', maxHeight: '100px' }} 
                        />
                        <div>
                            <p className="text-white body-1r mb-3">It’s recommended to use a picture that’s at least 98 x 98 pixels and 4MB or less. Use a PNG or GIF (no animations) file. </p>
                            <div>
                                <button onClick={handleChangeClick} className="py-3 px-4 brand-600 button-2b">
                                    Change
                                </button>
                                <button onClick={handleRemoveClick} className="py-3 px-4 brand-600 button-2b">
                                    Remove
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
                    label="User Name"
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
