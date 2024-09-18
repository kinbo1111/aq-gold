import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieItem from "./MovieItem";
// import { MovieData } from "../../utils/content";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { VideoData, VideoProps } from "../../types/index";

export type MovieListProp = {
  label: string;
  movieData: VideoProps[] | VideoData[];
}

const MovieList: React.FC<MovieListProp> = ({ label, movieData}) => {
  return (
    <div className="py-12 px-4 border-b-4 border-[#2a2d2e]">
      <h5 className="text-white sub-1b pl-8 mb-6">{label}</h5>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        spaceBetween={32}
        slidesPerView={7.5}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1440: {
            slidesPerView: 5.5,
          },
        }}
      >
        {movieData.map((item, index) => (
          <SwiperSlide  key={index} >
            <MovieItem imgSrc={item.thumbnailUrl ?? ''} videoId={item.id} videoUrl={item.videoUrl}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
