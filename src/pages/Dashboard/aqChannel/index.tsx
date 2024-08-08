import React, { useContext } from 'react';
import Avatar from "../../../components/Avatar";
import DashboardContainer from "../../../components/DashboardContainer";
import {IoMdAdd} from "react-icons/io";
import ChannelTab from './ChannelTab';
import { UserContext } from '../../../contexts/UserContext';
import { useTranslation } from 'react-i18next';
import DefaultAvatarUrl from "../../../assets/images/default_avatar.png";

const ChannelHome = () => {
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
                    src={user?.url ?? DefaultAvatarUrl }
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