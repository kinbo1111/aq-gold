import React, { useState, useRef } from "react";
import { useForm } from 'react-hook-form';
import DefaultAvatarUrl from "../../../assets/images/default_avatar.png";
import Input from "../../../components/inputs/Input";

interface ChannelSettingsProps {
    currentAvatarUrl?: string;
    onAvatarChange: (file: File) => void;
    onAvatarRemove: () => void;
}

const ChannelSettings: React.FC<ChannelSettingsProps> = ({
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
            <h5 className="sub-1b text-white mb-4">Your AQvr Channel</h5>
            <div className="pb-6 border-b border-[#585a5c]">
                <h6 className="sub-2r text-white mb-2">Picture</h6>
                <p className="body-1r text-white mb-4">Your channel picture will appear where your channel is presented on YouTube, like next to your videos </p>
                <div>
                    <div className="flex items-center justify-start gap-6">
                        <img 
                            //   src={currentAvatarUrl || DefaultAvatarUrl} 
                            src={DefaultAvatarUrl} 
                            alt="Current Avatar" 
                            style={{ maxWidth: '100px', maxHeight: '100px' }} 
                        />
                        <div>
                            <p className="text-white body-1r mb-3">It’s recommended to use a picture that’s at least 98 x 98 pixels and 4MB or less. Use a PNG or GIF (no animations) file. Make sure your picture follows the AQ GOLD Community Guidelines. </p>
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
            <div className="py-3 flex flex-col gap-3">
                <h6 className="sub-2r text-white">Your account</h6>
                <Input
                    id="channelName"
                    label="Name"
                    type="text"
                    placeholder="HARUO GOLD"
                    register={register}
                    errors={errors}
                    required
                    small
                />
                  <Input
                    id="handle"
                    label="Handle"
                    type="text"
                    placeholder="@HARUOGOLD"
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
