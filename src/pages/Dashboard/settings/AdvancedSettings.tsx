import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import Input from "../../../components/inputs/Input";
import { HiClipboardDocument } from "react-icons/hi2";
import DeleteChannel from "./DeleteChannel";
import DeleteAccount from "./DeleteAccount";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { useUser } from "../../../contexts/UserContext";
import { useChannel } from "../../../contexts/ChannelContext";

const AdvancedSettings = () => {
    const [isDeleteChannelOpen, setIsDeleteChannelOpen] = useState(false);
    const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
    const {
        register,
        getValues,
        formState: { errors },
    } = useForm();

    const { user } = useUser();
    const { channelData } = useChannel();

    const handleCopy = (fieldId: string) => {
        const value = getValues(fieldId);
        if (value) {
            navigator.clipboard.writeText(value)
                .then(() => {
                    message.success("copied to clipboard!")
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        }
    };

    const handleOpenDeleteChannel = () => {
        setIsDeleteChannelOpen(true);
    };

    const handleCloseDeleteChannel = () => {
        setIsDeleteChannelOpen(false);
    };

    const handleOpenDeleteAccount = () => {
        setIsDeleteAccountOpen(true);
    };

    const handleCloseDeleteAccount = () => {
        setIsDeleteAccountOpen(false);
    };

    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-4">
            <div className="relative">
                <Input
                    id="userId"
                    label={t("User ID")}
                    type="text"
                    register={register}
                    errors={errors}
                    value={user?.sub}
                    required
                    small
                />
                <HiClipboardDocument
                    size={16}
                    className="gray-200 absolute bottom-[12px] right-3 transform cursor-pointer"
                    onClick={() => handleCopy("userId")}
                />
            </div>
            <div className="relative">
                <Input
                    id="channelId"
                    label={t("Channel ID")}
                    type="text"
                    placeholder="xbhbbdsbddmamsabc"
                    register={register}
                    value={channelData?.id}
                    errors={errors}
                    required
                    small
                />
                <HiClipboardDocument
                    size={16}
                    className="gray-200 absolute bottom-[12px] right-3 transform cursor-pointer"
                    onClick={() => handleCopy("channelId")}
                />
            </div>
            <div>
                <h6 className="sub-2r text-white mb-2">{t("Delete Your AQvar Channel")}</h6>
                <div
                    onClick={handleOpenDeleteChannel}
                    className="body-1r text-[#1570EF] underline cursor-pointer"
                >
                    {t("Delete Your AQvar Channel")}
                </div>
            </div>
            <div>
                <h6 className="sub-2r text-white mb-2">{t("Delete your Account")}</h6>
                <div
                    onClick={handleOpenDeleteAccount}
                    className="body-1r text-[#1570EF] underline cursor-pointer"
                >
                    {t("Delete your Account")}
                </div>
            </div>
            {isDeleteChannelOpen && <DeleteChannel isOpen={isDeleteChannelOpen} onClose={handleCloseDeleteChannel} />}
            {isDeleteAccountOpen && <DeleteAccount isOpen={isDeleteAccountOpen} onClose={handleCloseDeleteAccount} />}
        </div>
    );
};

export default AdvancedSettings;
