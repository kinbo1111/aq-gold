import React, { useEffect, useState } from 'react';
import Avatar from "../../../components/Avatar";
import DashboardContainer from "../../../components/DashboardContainer";
import {IoMdAdd} from "react-icons/io";
import ChannelTab from './ChannelTab';
import { useUser } from '../../../contexts/UserContext';
import { useTranslation } from 'react-i18next';
import { API, graphqlOperation } from 'aws-amplify';
import { getUserChannel } from '../../../graphql/mutations'; 
import CreateChannel from './CreateChannel'; 

const ChannelHome: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useUser();
    const [hasChannel, setHasChannel] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserChannel = async () => {
        if (!user) return;

        try {
            // Fetch user's channel
            const response = await API.graphql(graphqlOperation(getUserChannel, { userId: user.sub }));
            const channelData = response;
            if (channelData) {
            setHasChannel(true);
            } else {
            setHasChannel(false);
            }
        } catch (error) {
            console.error('Error fetching channel:', error);
            setHasChannel(false);
        } finally {
            setLoading(false);
        }
        };

        fetchUserChannel();
    }, [user]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
        {hasChannel ? (
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
        ) : (
            <CreateChannel />
        )}
        </div>
    );
};

export default ChannelHome;
