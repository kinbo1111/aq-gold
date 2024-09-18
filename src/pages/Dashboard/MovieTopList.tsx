import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieData } from "../../utils/content";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import MovieTopItem from "./MovieTopItem";
import { VideoProps, VideoData } from "../../types/index";

export type MovieTopListProp = {
  label: string;
  movieData: VideoProps[] | VideoData[];
  
}

const MovieTopList: React.FC<MovieTopListProp> = ({ label, movieData }) => {

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
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1440: {
            slidesPerView: 4,
          },
        }}
      >
        <div className="flex flex-row">
        {movieData.map((item, index) => (
            <SwiperSlide  key={index}>
              <div className="flex flex-row">
                  <span className="order-num">{index + 1}</span>
              <MovieTopItem imgSrc={item.vThumbnailUrl ?? ''}  videoId={item.id} videoUrl={item.videoUrl}/>
              </div>
            </SwiperSlide >
        ))}
          </div>
      </Swiper>
    </div>
  );
};

export default MovieTopList;
