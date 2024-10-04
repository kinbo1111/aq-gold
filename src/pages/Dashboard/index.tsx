import React, { useState, useEffect} from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button";
import MainContainer from "../../components/MainContainer";
import MovieList from "./MovieList";
import MovieTopList from "./MovieTopList";
import { useVideo } from "../../contexts/VideoContext";
import { useUser } from "../../contexts/UserContext";
import { useSidebar } from "../../contexts/SidebarContext";
import VideoModal from "../../components/VideoModal";
import { useNavigate } from "react-router-dom";


export type VideoProperty = {
  videoUrl: string;
  videoId: string;
}

const Dashboard = () => {
    const { t } = useTranslation();
    const { collapsed } = useSidebar();
    const { topVideos, recommendVideos, newVideos, popularVideos, continueVideos, fetchVideo } = useVideo();
    const navigate = useNavigate();

    useEffect(() => {
        fetchVideo()
    }, []);

    const handleShow = () => {
        navigate(`/video/${topVideos[0]?.id}`, { state: { videoUrl:topVideos[0]?.videoUrl } });
    };
    
    return (
        <MainContainer>
            <div className="relative main-video w-full">
                <img src={topVideos[0]?.thumbnailUrl} alt="" className="w-full min-h-70p" />
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
                    movieData={recommendVideos}
                />
                 <MovieList
                    label={t("Continue Watching")}
                    movieData={continueVideos}  
                />
                 <MovieList
                    label={t("New on AQ Gold")}
                    movieData={newVideos}
                />
                 <MovieTopList
                    label={t("Top 10 Contents in AQ GOLD")}
                    movieData={topVideos}
                />
                 <MovieTopList
                    label={t("AQ Original Contents")}
                    movieData={[]}
                />
                 <MovieTopList
                    label={t("Top 10 Contents in AQvar")}
                    movieData={topVideos}
                />
                 <MovieList
                    label={t("New on AQvar")}
                    movieData={newVideos}
                />
                 <MovieList
                    label={t("Popular on AQ Gold")}
                    movieData={popularVideos}
                />
            </div>
           
        </MainContainer>
    );
};

export default Dashboard;