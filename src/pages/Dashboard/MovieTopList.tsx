import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieData } from "../../utils/content";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import MovieTopItem from "./MovieTopItem";

interface MovieTopListProp {
  label: string;
}

const MovieTopList: React.FC<MovieTopListProp> = ({ label }) => {
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
        {MovieData.map((item, index) => (
          <>
      <SwiperSlide>
            {/* <SwiperSlide className="w-[400px]"> */}
             <div className="flex flex-row">
                <span className="order-num">{index + 1}</span>
                 <MovieTopItem key={index} imgSrc={item.imgSrc} />
            </div>
               </SwiperSlide >
          {/* </SwiperSlide > */}
          </>
        ))}
          </div>
      </Swiper>
    </div>
  );
};

export default MovieTopList;
