import React, {useContext} from 'react';
import Avatar from "../../../components/Avatar";
import DashboardContainer from "../../../components/DashboardContainer";
import ListTab from './ListTab';
import { UserContext } from '../../../contexts/UserContext';
import DefaultAvatarUrl from "../../../assets/images/default_avatar.png";

const MyList = () => {
   
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("userContext must be used within an AuthProvider!")
    }
    const { user } = userContext;
    return (
        <DashboardContainer>
            <div className='mb-6'>
                <Avatar
                    src={user?.url ?? DefaultAvatarUrl} 
                    name={user?.nickname ?? 'No Name'}
                />
            </div>
            <ListTab/>

        </DashboardContainer>
    );
};

export default MyList;