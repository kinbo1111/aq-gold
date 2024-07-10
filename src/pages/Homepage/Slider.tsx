import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import './slider.css';
import Slide01 from "../../assets/images/movie01.png"

import { Navigation } from 'swiper/modules';

const Slider= () => {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mainSwiper">
        <SwiperSlide><img src={Slide01} alt="" /></SwiperSlide>
        <SwiperSlide><img src={Slide01} alt="" /></SwiperSlide>
        <SwiperSlide><img src={Slide01} alt="" /></SwiperSlide>
        <SwiperSlide><img src={Slide01} alt="" /></SwiperSlide>
        <SwiperSlide><img src={Slide01} alt="" /></SwiperSlide>
      </Swiper>
    </>
  );
}

export default Slider;