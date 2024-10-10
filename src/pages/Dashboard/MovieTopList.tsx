import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { API } from 'aws-amplify';
import { message } from 'antd';
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useUser } from '../../contexts/UserContext';
import VideoDetailModal from "../../components/VideoDetailModal";
import { VideoData } from "../../types/index";
import { createFavoriteChannel } from '../../graphql/mutations';

export type MovieTopListProp = {
  label: string;
  movieData: VideoData[];
};

const MovieTopList: React.FC<MovieTopListProp> = ({ label, movieData }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<VideoData | null>(null);

  const { user } = useUser();

  const addAQvarChannel = async (channelId: string, owner: string) => {
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

  // Open the modal and set the selected movie
  const handleOpenModal = (movie: VideoData) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="py-12 px-4 border-b-4 border-[#2a2d2e]">
      <h5 className="text-white sub-1b pl-8">{label}</h5>
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
            <SwiperSlide key={item.id}>
              <div className="flex flex-row">
                <span className="order-num">{index + 1}</span>
                <div className="w-full overflow-hidden flex justify-center items-center">
                  <img
                    src={item.vThumbnailUrl}
                    alt={item.title}
                    className="max-h-52 max-w-[250px] cursor-pointer"
                    onClick={() => handleOpenModal(item)}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>

      {selectedMovie && (
        <VideoDetailModal
          id={selectedMovie.id}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          channelId={selectedMovie?.channelId}
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

export default MovieTopList;
