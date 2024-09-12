import React, {useEffect} from 'react';
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
         console.log(hasChannel, channelData)
        checkUserChannel();
    }, []);
  
    // if (loadingChannel) return <div>Loading...</div>;
  
    // if (!hasChannel) {
    //     return <div>No channel found. Create your channel now!</div>;
    // }
   
    return hasChannel ?
        <DashboardContainer>
            <div className='mb-6'>
                <Avatar
                    src={user?.channelAvatar}
                    name={user?.nickname ?? 'No Name'}
                    intro={t("handle") + "(＠〜〜〜)"}
                    buttonName={t('Customize channel')}
                />
            </div>
            <StudioTab />

        </DashboardContainer>
        : <CreateChannel />;
};

export default AQStudioHome;