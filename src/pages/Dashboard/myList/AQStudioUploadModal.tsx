import React from "react";
import { MdOutlineVideoCall } from "react-icons/md";
import Button from "../../../components/Button";
import { useTranslation } from "react-i18next";

const AQStudioUploadModal = () => {
    const { t } = useTranslation();
    return(
        <div className="relative flex items-center justify-center w-full mt-[180px]">
            <div className="max-w-[530px] w-full b-gray-500 rounded-[10px] py-14 flex items-center justify-center flex-col">
                <h6 className="text-center gray-200 sub-2r mb-6">{t("Let’s upload and share your 360° video contents.")}</h6>
                <Button
                    label="AQ Studio"
                    onClick={() => {}}
                    iconExist
                    full
                    small
                    icon={MdOutlineVideoCall}
                    iconSize={20}
                    reverse
                />
            </div>  
        </div>
    );
};

export default AQStudioUploadModal;