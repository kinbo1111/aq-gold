import React from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

import MainBanner from '../../../assets/images/main.png'
import Button from "../../../components/Button";
import MainContainer from "../../../components/MainContainer";
import MovieList from "../MovieList";
import { useTranslation } from "react-i18next";
import { useVideo } from "../../../contexts/VideoContext";
import { useUser } from "../../../contexts/UserContext";
import { useSidebar } from "../../../contexts/SidebarContext";

const Animal = () => {
    const { t } = useTranslation();
    const { continueVideos } = useUser()
    const { filterVideosByCategory } = useVideo();
    const { collapsed } = useSidebar();
    const filterContinueWatching = () => {
      return continueVideos.filter(video => video.category && video.category.toLowerCase() === 'animal');
    };
    const { filteredNewVideos, filteredPopularVideos, filteredRecommendVideos, filteredMyList } = filterVideosByCategory('animal');

    return (
        <MainContainer>
            <div className="relative main-video w-full">
                <img src={MainBanner} alt="" className="w-full h-auto" />
                <div className={`absolute left-16 z-50 ${collapsed ? 'bottom-80' : 'bottom-14'}`} >
                    <h1 className="h4 text-white mb-4">One Piece</h1>
                    <p className="sub-2r text-white mb-4">
                        {t("ten")}
                        <br />
                        {t("nine")}
                    </p>
                    <div className="score mb-4 flex items-center gap-3">
                        <FaStar className="text-[#FFEA2B]" size={30}/>
                        <FaStar className="text-[#FFEA2B]" size={30}/>
                        <FaStar className="text-[#FFEA2B]" size={30}/>
                        <FaRegStar className="text-white" size={30}/>
                        <FaRegStar className="text-white" size={30}/>
                    </div>
                    <Button 
                        label="見る"
                        icon={FaPlay}
                        onClick={() => {}}
                        iconExist
                        full
                    />
                </div>
                <div className="bg-border"></div>
            </div>
            <div>
                <MovieList
                    label={t("Recommend Contents")}
                    movieData={filteredRecommendVideos}
                />
                 <MovieList
                    label={t("New on AQ Gold")}
                    movieData={filteredNewVideos}
                />
                 <MovieList
                    label={t("AQ Original Contents")}
                    movieData={[]}
                />
               
                 <MovieList
                    label={t("Popular on AQ Gold")}
                    movieData={filteredPopularVideos}
                />
                 <MovieList
                    label={t("Continue Watching")}
                    movieData={filterContinueWatching()}
                />
                 <MovieList
                    label={t("AQvar Contents")}
                    movieData={[]}
                />
                 <MovieList
                    label={t("My List")}
                    movieData={filteredMyList}
                />
            </div>
        </MainContainer>
    );
};

export default Animal;