import React from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import MainBanner from '../../../assets/images/main.png'
import Button from "../../../components/Button";
import MainContainer from "../../../components/MainContainer";
import MovieList from "../MovieList";
import { useTranslation } from "react-i18next";
import MovieTopList from "../MovieTopList";
import { useVideo } from "../../../contexts/VideoContext";
import { useSidebar } from "../../../contexts/SidebarContext";

const Favorite = () => {
    const { t } = useTranslation();
    const { collapsed } = useSidebar()
    const { videos, topVideos, recommendVideos, popularVideos, newVideos  } = useVideo();
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
                    label={t("Popular on AQ Gold")}
                />
            </div>
        </MainContainer>
    );
};

export default Favorite;