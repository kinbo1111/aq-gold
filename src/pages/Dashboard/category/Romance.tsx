import React from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";


import Button from "../../../components/Button";
import MainContainer from "../../../components/MainContainer";
import MovieList from "../MovieList";
import { useTranslation } from "react-i18next";
import { useVideo } from "../../../contexts/VideoContext";
import { useUser } from "../../../contexts/UserContext";
import { useSidebar } from "../../../contexts/SidebarContext";
import { useNavigate } from "react-router-dom";

const Romance = () => {
    const { t } = useTranslation();
    const { topVideos, filterVideosByCategory } = useVideo();
    const { collapsed } = useSidebar();
    const { filteredNewVideos, filteredPopularVideos, filteredRecommendVideos, filteredMyList } = filterVideosByCategory('romance');
    const { continueVideos } = useUser();

    const navigate = useNavigate();

    const handleShow = () => {
        navigate(`/video/${topVideos[0]?.id}`, { state: { videoUrl:topVideos[0]?.videoUrl } });
    };

    const filterContinueWatching = () => {
      return continueVideos.filter(video => video.category && video.category.toLowerCase() === 'romance');
    };

    return (
        <MainContainer>
            <div className="relative main-video w-full">
                <img src={topVideos[0]?.thumbnailUrl} alt="" className="w-full h-auto" />
                <div className={`absolute left-16 z-50 ${collapsed ? 'bottom-80' : 'bottom-14'}`} >
                    <h1 className="h4 text-white mb-4">{topVideos[0]?.title}</h1>
                    <p className="sub-2r text-white mb-4">
                        {topVideos[0]?.description}
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
                        onClick={handleShow}
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

export default Romance;