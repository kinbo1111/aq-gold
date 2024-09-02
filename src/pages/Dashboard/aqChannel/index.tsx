import React from 'react';
import Avatar from "../../../components/Avatar";
import DashboardContainer from "../../../components/DashboardContainer";
import {IoMdAdd} from "react-icons/io";
import ChannelTab from './ChannelTab';
import { useUser } from '../../../contexts/UserContext';
import { useTranslation } from 'react-i18next';

const ChannelHome = () => {
    const { t } = useTranslation();
    const { user } = useUser();
    
    return (
        <DashboardContainer>
            <div className='mb-6'>
                <Avatar
                    src={user?.channelAvatar }
                    name={user?.nickname ?? 'No Name'} 
                    intro="58 videos"
                    icon={IoMdAdd}
                    buttonName={t('My Favorite')}
                />
            </div>
            <ChannelTab/>
        </DashboardContainer>
    );
};

export default ChannelHome;