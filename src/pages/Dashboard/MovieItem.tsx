import React from "react";

interface MovieItemProps {
    imgSrc: string;
}

const MovieItem: React.FC<MovieItemProps> = ({
    imgSrc
}) => {
    return (
        <div className="w-full">
            <img src={imgSrc} alt="" className="w-full" />
        </div>
    );
};

export default MovieItem;