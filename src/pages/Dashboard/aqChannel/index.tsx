import * as React from 'react';
import Avatar from "../../../components/Avatar";
import DashboardContainer from "../../../components/DashboardContainer";
import {IoMdAdd} from "react-icons/io";
import ChannelTab from './ChannelTab';
import { useTranslation } from 'react-i18next';

const ChannelHome = () => {
     const { t } = useTranslation();
    return (
        <DashboardContainer>
            <div className='mb-6'>
                <Avatar
                    name="Anna Nguyen"
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