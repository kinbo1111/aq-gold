import React from 'react';
import SearchKeywordResult from "../../../components/SearchKeywordResult";
import DashboardContainer from '../../../components/DashboardContainer';
import VideoList from '../../../components/VideoList';
const Search = () => {
    return (
        <DashboardContainer>
            <div className='b-gray-800 m-3'>
                <SearchKeywordResult />
                <VideoList className='p-5'/>
            </div>
        </DashboardContainer>
    );
};

export default Search;