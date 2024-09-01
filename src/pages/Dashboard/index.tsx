import React, {useEffect, useState, useContext} from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { UserContext } from '../../contexts/UserContext';
import { getContinueWatchingVideos, ContinueWatchingVideo } from '../../services/UserActivityService';
import { fetchAllVideos, fetchTopContent } from "../../services/VideoService";
import MainBanner from '../../assets/images/main.png'
import Button from "../../components/Button";
import MainContainer from "../../components/MainContainer";
import MovieList from "./MoiveList";
import MovieTopList from "./MovieTopList";
import { VideoData } from "../../types";

const Dashboard = () => {
    const { t } = useTranslation();
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("userContext must be used within an AuthProvider!")
    }
      
    const { user } = userContext;
    const [continueVideos, setContinueVideos] = useState<ContinueWatchingVideo[]>([]);
    const [topVideos, setTopVideos] = useState<VideoData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContinueWatchingVideos = async () => {
            if (!user) return; // Ensure user is authenticated
            if (user.sub === undefined) return;

        setLoading(true);
        try {
            const continueWatchingVideos = await getContinueWatchingVideos(user.sub);
            const videos = await fetchTopContent(1);
            setTopVideos(videos);
            setContinueVideos(continueWatchingVideos);
        } catch (err) {
            console.error('Error fetching continue watching videos:', err);
            setError('Failed to fetch continue watching videos.');
        } finally {
            setLoading(false);
        }
        };

        fetchContinueWatchingVideos();
    }, [user]);


    return (
        <MainContainer>
            <div className="relative main-video w-full">
                <img src={MainBanner} alt="" className="w-full h-auto" />
                <div className="absolute bottom-14 left-16 z-50" >
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
                    movieData={ []}
                />
                 <MovieList
                    label={t("Continue Watching")}
                    movieData={continueVideos.map((v) => v.video)}  
                />
                 <MovieList
                    label={t("New on AQ Gold")}
                    movieData={[]}

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
                    label={t("Top 10 Contents in AQvr")}
                    movieData={topVideos}
                />
                 <MovieList
                    label={t("New on AQvr")}
                    movieData={[]}
                />
                 <MovieList
                    label={t("Popular on AQ Gold")}
                    movieData={[]}
                />
            </div>
        </MainContainer>
    );
};

export default Dashboard;