import React, { useContext } from 'react';
import Avatar from "../../../components/Avatar";
import DashboardContainer from "../../../components/DashboardContainer";
import StudioTab from './StudioTab';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../../contexts/UserContext';
import DefaultAvatarUrl from "../../../assets/images/default_avatar.png";

const AQStudioHome = () => {
    const { t } = useTranslation();
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("userContext must be used within an AuthProvider!")
    }
    const { user } = userContext;
    return (
        <DashboardContainer>
            <div className='mb-6'>
                <Avatar
                    src={user?.channelUrl ?? DefaultAvatarUrl}
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