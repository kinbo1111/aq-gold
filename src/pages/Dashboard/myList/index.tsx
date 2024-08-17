import React, {useContext} from 'react';
import Avatar from "../../../components/Avatar";
import DashboardContainer from "../../../components/DashboardContainer";
import ListTab from './ListTab';
import { UserContext } from '../../../contexts/UserContext';

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
                    src={user?.profileAvatar} 
                    name={user?.nickname ?? 'No Name'}
                />
            </div>
            <ListTab/>

        </DashboardContainer>
    );
};

export default MyList;