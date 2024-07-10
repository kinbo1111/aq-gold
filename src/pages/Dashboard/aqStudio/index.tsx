import * as React from 'react';
import Avatar from "../../../components/Avatar";
import DashboardContainer from "../../../components/DashboardContainer";
import StudioTab from './StudioTab';


const AQStudioHome = () => {
    return (
        <DashboardContainer>
            <div className='mb-6'>
                <Avatar
                    name="Anna Nguyen"
                    intro="handle(＠〜〜〜)"
                    buttonName='Customize channel'
                />
            </div>
            <StudioTab/>

        </DashboardContainer>
    );
};

export default AQStudioHome;