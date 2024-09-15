import React, {useEffect, useState} from 'react';
import Avatar from "../../../components/Avatar";
import DashboardContainer from "../../../components/DashboardContainer";
import StudioTab from './StudioTab';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../contexts/UserContext'; 
import { useChannel } from '../../../contexts/ChannelContext';
import CreateChannel from '../aqChannel/CreateChannel';

const AQStudioHome = () => {
    const { t } = useTranslation();
    const { user } = useUser();
    const { hasChannel, channelData, loadingChannel, checkUserChannel } = useChannel();

    useEffect(() => {
        checkUserChannel();
    }, []);
   
    return hasChannel ?
        <DashboardContainer>
            <div className='mb-6'>
                <Avatar
                    src={channelData?.avatarUrl}
                    name={channelData.name ?? 'No Name'}
                    intro={t("handle") + "(＠〜〜〜)"}
                    buttonName={t('Customize channel')}
                />
            </div>
            <StudioTab />

        </DashboardContainer>
        : <CreateChannel />;
};

export default AQStudioHome;