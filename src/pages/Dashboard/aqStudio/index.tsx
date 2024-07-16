import * as React from 'react';
import Avatar from "../../../components/Avatar";
import DashboardContainer from "../../../components/DashboardContainer";
import StudioTab from './StudioTab';
import { useTranslation } from 'react-i18next';

const AQStudioHome = () => {
    const { t } = useTranslation();
    return (
        <DashboardContainer>
            <div className='mb-6'>
                <Avatar
                    name="Anna Nguyen"
                    intro={t("handle") + "(＠〜〜〜)"} 
                    buttonName={t('Customize channel')}
                />
            </div>
            <StudioTab/>

        </DashboardContainer>
    );
};

export default AQStudioHome;