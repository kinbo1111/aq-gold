import { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useVideo } from "../../../contexts/VideoContext";
import Button from "../../../components/Button";
import MainContainer from "../../../components/MainContainer";
import MovieList from "../MovieList";
import DeleteChannel from "../settings/DeleteChannel";
import { useSidebar } from "../../../contexts/SidebarContext";
import { useNavigate } from "react-router-dom";

const AQvar = () => {
    const [isDeleteChannelOpen, setIsDeleteChannelOpen] = useState(false);
    const { t } = useTranslation();
    const { collapsed } = useSidebar();
    const { topVideos, filterVideosByCategory } = useVideo();
    const { filteredNewVideos, filteredPopularVideos, filteredRecommendVideos, filteredMyVideos, filteredContinueVideos } = filterVideosByCategory('AQvar');

    const navigate = useNavigate();

    const handleShow = () => {
        navigate(`/video/${topVideos[0]?.id}`, { state: { videoUrl:topVideos[0]?.videoUrl } });
    };
    
    const handleOpenDeleteChannel = () => {
        setIsDeleteChannelOpen(true);
    };

    const handleCloseDeleteChannel = () => {
        setIsDeleteChannelOpen(false);
    };

  return (
      <MainContainer>
          <div className="relative main-video w-full">
              <img src={topVideos[0]?.thumbnailUrl} alt="" className="w-full h-auto" />
                <div className="absolute top-3 right-3">
                <button onClick={handleOpenDeleteChannel}>
                    <IoCloseCircle className="w-6 h-6"/>
                  </button>
              </div>  
              <div className={`absolute left-16 z-50 ${collapsed ? 'bottom-80' : 'bottom-14'}`} >
                <h1 className="h4 text-white mb-4">{topVideos[0]?.title}</h1>
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
                    label={t("New on AQvar")}
                    movieData={filteredNewVideos}
                />
                 <MovieList
                    label={t("AQ Original Contents")}
                    movieData={[]}
                />
                 <MovieList
                    label={t("Popular AQ AQvar")}
                    movieData={filteredPopularVideos}
                />
                 <MovieList
                    label={t("Trend AQvar Contents")}
                    movieData={filteredContinueVideos}
                />
                 <MovieList
                    label={t("Continue Watching")}
                    movieData={filteredMyVideos}
                />
                 <MovieList
                    label={t("My List")}
                    movieData={filteredMyVideos}
                />
            </div>
            {isDeleteChannelOpen && <DeleteChannel isOpen={isDeleteChannelOpen} onClose={handleCloseDeleteChannel} />}
        </MainContainer>
    );
};

export default AQvar;