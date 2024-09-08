import React from 'react';
import { useVideo } from '../../../contexts/VideoContext';
import SearchKeywordResult from "../../../components/SearchKeywordResult";
import DashboardContainer from '../../../components/DashboardContainer';
import VideoList from '../../../components/VideoList';
import { useParams } from 'react-router-dom';
const Search = () => {

    const { searchedVideos } = useVideo();
    const { keyword } = useParams();

    return (
        <DashboardContainer>
            <div className='b-gray-800 m-3'>
                <SearchKeywordResult keyword={keyword ?? ''} />
                <VideoList className='p-5' videoData={searchedVideos}/>
            </div>
        </DashboardContainer>
    );
};

export default Search;