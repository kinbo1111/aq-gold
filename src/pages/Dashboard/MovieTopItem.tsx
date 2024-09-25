import React from "react";
import { useNavigate } from "react-router-dom";

interface MovieTopItemProps {
    videoId: string;
    imgSrc: string;
    videoUrl: string;
    onClick: void;
}

const MovieTopItem: React.FC<MovieTopItemProps> = ({
    imgSrc,
}) => {

    const navigate = useNavigate();

    const handleShow = () => {
        
    };
    return (
        <div className="w-full overflow-hidden flex justify-center">
            <img src={imgSrc} alt="" className="h-full max-w-[250px] justify-center" onClick={handleShow} />
        </div>
    );
};

export default MovieTopItem;