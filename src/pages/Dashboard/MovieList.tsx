import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { API } from 'aws-amplify';
import { message } from 'antd';
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useUser } from '../../contexts/UserContext';
import VideoDetailModal from "../../components/VideoDetailModal";
import { VideoData, VideoProps } from "../../types/index";
import { createFavoriteChannel } from '../../graphql/mutations';

export type MovieListProp = {
  label: string;
  movieData: VideoData[];
}

const MovieList: React.FC<MovieListProp> = ({ label, movieData }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<VideoData | null>(null);
  const { user } = useUser();

  const addAQvarChannel = async (channelId: String, owner:String) => {
    try {
      const input = {
        userId: user?.sub,
        channelId: channelId,  
      };

      await API.graphql({
        query: createFavoriteChannel,
        variables: { input },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      message.success(`Channel ${owner}'s channel has been added to your AQvar channels.`);
    } catch (error) {
      message.warning('Failed to add channel to AQvar. Please try again later.');
      console.error('Error adding AQvar channel:', error);
    }
  };
  const handleOpenModal = (movie: VideoData | null) => {
    setSelectedMovie(movie)
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null)
    setModalOpen(false);
  };
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
            <div className="w-full">
              <img src={item.thumbnailUrl} alt="" className="w-full" onClick={() => handleOpenModal(item)} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {selectedMovie && (
        <VideoDetailModal
          id={selectedMovie.id}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAddChannel={() => addAQvarChannel(selectedMovie.channelId, selectedMovie.owner)}
          imgSrc={selectedMovie.thumbnailUrl ?? ''}
          viewCount={selectedMovie.viewCount ?? 0}
          videoUrl={selectedMovie.videoUrl}
          videoTitle={selectedMovie.title}
          owner={selectedMovie.owner}
          videos={[]}
          videoDescription={selectedMovie.description ?? ''}
          duration={selectedMovie.duration ?? 0}
          favoriteCount={selectedMovie.favoriteCount ?? 0}
        />
      )}
    </div>
  );
};

export default MovieList;
