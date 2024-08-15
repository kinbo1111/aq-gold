import React, { useState } from 'react';
import VideoDetailModal from './VideoDetailModal';
import { IoMdAdd, IoMdArrowDropdown } from "react-icons/io";

interface VideoItemProps {
  imageSrc: string;
  title: string;
  description: string;
  icon?: boolean;
  videoUrl: string;
  videos?: any[];
}

const VideoItem: React.FC<VideoItemProps> = ({ imageSrc, title, description, icon, videos, videoUrl }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    console.log("closed");
  };

  return (
    <div>
      <div className="video cursor-pointer relative" onClick={handleOpenModal}>
        <img src={imageSrc} alt={title} className="rounded-xl w-full" />
        <div className="video-info">
          <h2 className="body-1b mt-3 mb-2 text-white">{title}</h2>
          <p className="body-2r text-gray-100">{description}</p>
          {icon && (
            <div className='absolute bottom-1 right-4'>
              <button className='w-8 h-8 border border-[#c7a76b] rounded-full flex items-center justify-center'>
                <IoMdAdd className='text-[#c7a76b]' size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
      <VideoDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imgSrc={imageSrc}
        videoUrl={videoUrl}
        videoTitle={title}
        videoDescription={description}
        videos={videos?? []}
      />
    </div>
  );
};

export default VideoItem;
