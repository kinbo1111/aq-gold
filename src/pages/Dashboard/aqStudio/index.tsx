import React, { useContext } from 'react';
import Avatar from "../../../components/Avatar";
import DashboardContainer from "../../../components/DashboardContainer";
import StudioTab from './StudioTab';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../../contexts/UserContext';

const AQStudioHome = () => {
    const { t } = useTranslation();
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("userContext must be used within an AuthProvider!")
    }
    const { user } = userContext;
    console.log(user)
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