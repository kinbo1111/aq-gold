import React from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

import MainBanner from '../../assets/images/main.png'
import Button from "../../components/Button";
import MainContainer from "../../components/MainContainer";
import MovieList from "./MoiveList";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
    const { t } = useTranslation();
    return (
        <MainContainer>
            <div className="relative main-video w-full">
                <img src={MainBanner} alt="" className="w-full h-auto" />
                <div className="absolute bottom-14 left-16 z-50" >
                    <h1 className="h4 text-white mb-4">One Piece</h1>
                    <p className="sub-2r text-white mb-4">偉大なる航路（グランドライン）を航海したモンキー・D・ルフィと麦わらの一味。<br/>彼はワンピースの大秘宝を見つけて新しい海賊王になることを望んでいます。</p>
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
                />
                 <MovieList
                    label={t("Continue Watching")}
                />
                 <MovieList
                    label={t("New on AQ Gold")}
                />
                 <MovieList
                    label={t("Top 10 Contents in AQ GOLD")}
                />
                 <MovieList
                    label={t("AQ Original Contents")}
                />
                 <MovieList
                    label={t("Top 10 Contents in AQvr")}
                />
                 <MovieList
                    label={t("New on AQvr")}
                />
                 <MovieList
                    label={t("Popular on AQ Gold")}
                />
            </div>
        </MainContainer>
    );
};

export default Dashboard;