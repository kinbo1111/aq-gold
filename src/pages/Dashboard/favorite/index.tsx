import React from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

import Button from "../../../components/Button";
import MainContainer from "../../../components/MainContainer";
import MovieList from "../MovieList";
import { useTranslation } from "react-i18next";
import MovieTopList from "../MovieTopList";
import { useVideo } from "../../../contexts/VideoContext";
import { useSidebar } from "../../../contexts/SidebarContext";
import { useNavigate } from "react-router-dom";

const Favorite = () => {
    const { t } = useTranslation();
    const { collapsed } = useSidebar()
    const { videos, topVideos, recommendVideos, popularVideos, newVideos, favoriteVideos } = useVideo();
    const navigate = useNavigate();
    const handleShow = () => {
        navigate('/vr-view', { state: topVideos[0]?.videoUrl });
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
                    movieData={newVideos}
                    label={t("New on AQGOLD")}
                />
                <MovieTopList
                    movieData={topVideos}
                    label={t("Top 10 Contents in AQ GOLD")}
                />
                <MovieList
                    movieData={popularVideos}
                    label={t("Popular on AQGOLD")}
                />
                <MovieTopList
                    movieData={topVideos}
                    label={t("Top 10 Contents in AQvar")}
                />
                <MovieList
                    movieData={newVideos}
                    label={t("New on AQvar")}
                />
                <MovieList
                    movieData={popularVideos}
                    label={t("Popular on AQva")}
                />
            </div>
        </MainContainer>
    );
};

export default Favorite;