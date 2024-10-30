import React, {useEffect, useState} from 'react';
import Avatar from "../../../components/Avatar";
import DashboardContainer from "../../../components/DashboardContainer";
import StudioTab from './StudioTab';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../contexts/UserContext'; 
import { useChannel } from '../../../contexts/ChannelContext';
import CreateChannel from '../aqChannel/CreateChannel';
import { useNavigate } from 'react-router-dom';

const AQStudioHome = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { hasChannel, channelData, loadingChannel, checkUserChannel } = useChannel();

    useEffect(() => {
        checkUserChannel();
    }, []);

    
    const handleCreateChannel = () => {
        navigate("/create-channel")
    }

   
return (
    <DashboardContainer>
        {hasChannel ? (
            <>
                <div className="mb-6">
                    <Avatar
                        src={channelData?.avatarUrl}
                        name={channelData.name || 'No Name'}
                        intro={channelData?.description}
                        buttonName={t('Customize Channel')}
                    />
                </div>
                <StudioTab />
            </>
        ) : (
            <a
                onClick={handleCreateChannel}
                className="flex text-blue-500 underline cursor-pointer text-center items-center mt-6"
            >
                {t("You don't have a channel yet. Click here to create an AQvar Channel!")}
            </a>
        )}
    </DashboardContainer>
);

        
};

export default AQStudioHome;