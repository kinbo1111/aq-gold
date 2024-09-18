import React, { useState } from "react";
import VideoModal from '../../components/VideoModal';
import { useNavigate } from "react-router-dom";

export type MovieItemProps = {
    videoId: string;
    imgSrc: string;
    videoUrl: string;
}

export type VideoProps = {
  id: string;
  videoUrl: string;
  thumbnailUrl?: string;
  updatedAt?: string; // Make this optional
};


const MovieItem: React.FC<MovieItemProps> = ({
    videoId,
    imgSrc,
    videoUrl
}) => {
    const navigate = useNavigate();

    const handleShow = () => {
        navigate(`/video/${videoId}`, { state: { videoUrl:videoUrl } });
    };

    return (
    <>
        <div className="w-full">
            <img src={imgSrc} alt="" className="w-full" onClick={handleShow} />
        </div>
    </>
    );
};

export default MovieItem;