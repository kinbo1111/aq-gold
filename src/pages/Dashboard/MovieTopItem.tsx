import React from "react";

interface MovieTopItemProps {
    imgSrc: string;
}

const MovieTopItem: React.FC<MovieTopItemProps> = ({
    imgSrc
}) => {
    return (
        <div className="w-full overflow-hidden flex justify-center">
            <img src={imgSrc} alt="" className="h-full max-w-[250px] justify-center" />
        </div>
    );
};

export default MovieTopItem;