import React from 'react';
import Avatar from "../../../components/Avatar";
import DashboardContainer from "../../../components/DashboardContainer";
import StudioTab from './StudioTab';
import { useTranslation } from 'react-i18next';
import {useUser } from '../../../contexts/UserContext';

const AQStudioHome = () => {
    const { t } = useTranslation();
    const { user } = useUser();
    return (
        <DashboardContainer>
            <div className='mb-6'>
                <Avatar
                    src={user?.channelAvatar}
                    name={user?.nickname ?? 'No Name'} 
                    intro={t("handle") + "(＠〜〜〜)"} 
                    buttonName={t('Customize channel')}
                />
            </div>
            <StudioTab/>

        </DashboardContainer>
    );
};

export default AQStudioHome;