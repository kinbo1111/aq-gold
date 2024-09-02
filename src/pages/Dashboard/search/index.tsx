import React from 'react';
import { useVideo } from '../../../contexts/VideoContext';
import SearchKeywordResult from "../../../components/SearchKeywordResult";
import DashboardContainer from '../../../components/DashboardContainer';
import VideoList from '../../../components/VideoList';
const Search = () => {

    const { searchedVideos } = useVideo();

    return (
        <DashboardContainer>
            <div className='b-gray-800 m-3'>
                <SearchKeywordResult />
                <VideoList className='p-5' videoData={searchedVideos}/>
            </div>
        </DashboardContainer>
    );
};

export default Search;