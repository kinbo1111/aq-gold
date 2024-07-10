import * as React from 'react';
import Avatar from "../../../components/Avatar";
import DashboardContainer from "../../../components/DashboardContainer";
import {IoMdAdd} from "react-icons/io";
import ChannelTab from './ChannelTab';

const ChannelHome = () => {
    return (
        <DashboardContainer>
            <div className='mb-6'>
                <Avatar
                    name="Anna Nguyen"
                    intro="58 videos"
                    icon={IoMdAdd}
                    buttonName='My Favorite'
                />
            </div>
            <ChannelTab/>
        </DashboardContainer>
    );
};

export default ChannelHome;