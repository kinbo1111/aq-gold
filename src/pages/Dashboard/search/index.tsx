import React from 'react';
import SearchKeywordResult from "../../../components/SearchKeywordResult";
import DashboardContainer from '../../../components/DashboardContainer';
import VideoList from '../../../components/VideoList';
const Search = () => {
    return (
        <DashboardContainer>
            <div className='b-gray-800'>
                <SearchKeywordResult />
                <VideoList/>
            </div>
        </DashboardContainer>
    );
};

export default Search;