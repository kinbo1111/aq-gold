import * as React from 'react';
import Avatar from "../../../components/Avatar";
import DashboardContainer from "../../../components/DashboardContainer";
import ListTab from './ListTab';


const MyList = () => {
    return (
        <DashboardContainer>
            <div className='mb-6'>
                <Avatar
                    name="Anna Nguyen"
                />
            </div>
            <ListTab/>

        </DashboardContainer>
    );
};

export default MyList;