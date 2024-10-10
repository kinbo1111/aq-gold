import React from 'react';
import Avatar from "../../../components/Avatar";
import DashboardContainer from "../../../components/DashboardContainer";
import ListTab from './ListTab';
import { useUser } from '../../../contexts/UserContext';

const MyList = () => {
    const { user } = useUser();
    return (
        <DashboardContainer>
            <div className='mb-6'>
                <Avatar
                    src={user?.profileAvatar} 
                    name={user?.nickname ?? user?.username}
                />
            </div>
            <ListTab/>

        </DashboardContainer>
    );
};

export default MyList;