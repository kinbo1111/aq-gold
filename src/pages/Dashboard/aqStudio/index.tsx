import { useEffect } from 'react';
import Avatar from "../../../components/Avatar";
import DashboardContainer from "../../../components/DashboardContainer";
import StudioTab from './StudioTab';
import { useTranslation } from 'react-i18next';
import { useChannel } from '../../../contexts/ChannelContext';
import { useNavigate } from 'react-router-dom';
import CreateChannelButton from "../../../components/CreateChannelButton";

const AQStudioHome = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { hasChannel, channelData, loadingChannel, checkUserChannel } = useChannel();

    useEffect(() => {
        checkUserChannel();
    }, []);
   
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
            <CreateChannelButton />
        )}
    </DashboardContainer>
);

        
};

export default AQStudioHome;