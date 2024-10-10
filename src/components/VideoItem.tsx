import React, { useState, useEffect } from 'react';
import VideoDetailModal from './VideoDetailModal';
import { IoMdAdd, IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineFavorite } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { createFavoriteChannel } from '../graphql/mutations'; 
import { API } from 'aws-amplify';
import { useUser } from '../contexts/UserContext';
import { message } from 'antd';
import { getChannelById } from '../services/ChannelService';
import { Channel } from '../types';

export type VideoItemProps = {
  id: string;
  imageSrc: string;
  title: string;
  description: string;
  icon?: boolean;
  videoUrl: string;
  videos?: any[];
  owner: string;
  duration?: number;
  favoriteCount?: number;
  viewCount?: number;
  channelId?: string;
}

const VideoItem: React.FC<VideoItemProps> = ({ id, imageSrc, title, description, icon, videos, videoUrl, viewCount, duration, favoriteCount, owner, channelId }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { user } = useUser();


  const addAQvarChannel = async () => {
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
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div className="video cursor-pointer relative" onClick={handleOpenModal}>
        <img src={imageSrc} alt={title} className="rounded-xl w-full h-72" />
        <div className="px-1">
          <div className="body-1b mt-3 mb-2 text-white flex flex-row justify-between">
            {title.length > 23 ? `${title.slice(0, 23)}。。。` : title}
            <div className='flex flex-row'>
              <div className='flex flex-row'>
                <span className='w-6 h-6 flex items-center justify-center'>
                  <FaRegEye className='text-[#c7a76b]' size={12} />
                </span>
                <span className='text-[#c7a76b] flex items-center justify-center'>
                {viewCount}
                </span>
              </div>
              <div className='flex flex-row'>
                <span className='w-6 h-6 flex items-center justify-center'>
                  <MdOutlineFavorite className='text-[#be2727]' size={12} />
                </span>
                <span className='text-[#be2727] flex items-center justify-center'>
                {favoriteCount}
                </span>
              </div>
            </div>
          </div>
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
        id={id}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddChannel={addAQvarChannel}
        imgSrc={imageSrc}
        viewCount={viewCount?? 0}
        videoUrl={videoUrl}
        videoTitle={title}
        owner={owner}
        channelId={channelId}
        videoDescription={description}
        videos={videos ?? []}
        duration={duration ?? 0}
        favoriteCount={favoriteCount ?? 0}
      />
    </div>
  );
};

export default VideoItem;
