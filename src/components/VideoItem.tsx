import React, { useState } from 'react';
import VideoDetailModal from './VideoDetailModal';
import { IoMdAdd, IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineFavorite } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { incrementViewCount, createFavorite, deleteFavorite } from '../graphql/mutations';
import { getVideo, listFavorites } from '../graphql/queries';
import { API } from 'aws-amplify';
import { useUser } from '../contexts/UserContext';

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
}

const VideoItem: React.FC<VideoItemProps> = ({ id, imageSrc, title, description, icon, videos, videoUrl, viewCount, duration, favoriteCount, owner }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [hasIncremented, setHasIncremented] = useState(false);

  const { user } = useUser();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  //  const checkIfFavorited = async (videoId: string) => {
  //   try {
  //     const favoritesData = await API.graphql({
  //       query: listFavorites,
  //       variables: {
  //         filter: {
  //           userId: { eq: user?.attributes.sub },
  //           videoId: { eq: videoId },
  //         },
  //       },
  //       authMode: 'AMAZON_COGNITO_USER_POOLS',
  //     }) as { data: { listFavorites: { items: any[] } } };

  //     setIsFavorited(favoritesData.data.listFavorites.items.length > 0);
  //   } catch (error) {
  //     console.error('Error checking favorite status:', error);
  //   }
  // };

  // const handleFavoriteClick = async () => {
  //   if (!user) return;

  //   try {
  //     if (isFavorited) {
  //       // Remove from favorites
  //       const favoritesData = await API.graphql({
  //         query: listFavorites,
  //         variables: {
  //           filter: {
  //             userId: { eq: user.attributes.sub },
  //             videoId: { eq: id },
  //           },
  //         },
  //         authMode: 'AMAZON_COGNITO_USER_POOLS',
  //       }) as { data: { listFavorites: { items: any[] } } };

  //       if (favoritesData.data.listFavorites.items.length > 0) {
  //         const favoriteId = favoritesData.data.listFavorites.items[0].id;
  //         await API.graphql({
  //           query: deleteFavorite,
  //           variables: { input: { id: favoriteId } },
  //           authMode: 'AMAZON_COGNITO_USER_POOLS',
  //         });
  //         setIsFavorited(false);
  //       }
  //     } else {
  //       // Add to favorites
  //       await API.graphql({
  //         query: createFavorite,
  //         variables: {
  //           input: {
  //             userId: user.attributes.sub,
  //             videoId: id,
  //           },
  //         },
  //         authMode: 'AMAZON_COGNITO_USER_POOLS',
  //       });
  //       setIsFavorited(true);
  //     }
  //   } catch (error) {
  //     console.error('Error handling favorite:', error);
  //   }
  // };

  // const incrementVideoViewCount = async () => {
  //   if (hasIncremented || viewCount === undefined) return;

  //   try {
  //     await API.graphql({
  //       query: incrementViewCount,
  //       variables: {
  //         id: id,
  //         viewCount: viewCount + 1,
  //       },
  //       authMode: 'AMAZON_COGNITO_USER_POOLS',
  //     });
  //     setHasIncremented(true); // Ensure it only increments once per play
  //   } catch (error) {
  //     console.error('Error incrementing view count:', error);
  //   }
  // };

  return (
    <div>
      <div className="video cursor-pointer relative" onClick={handleOpenModal}>
        <img src={imageSrc} alt={title} className="rounded-xl w-full" />
        <div className="px-1">
          <div className="body-1b mt-3 mb-2 text-white flex flex-row justify-between">
            {title}
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
        imgSrc={imageSrc}
        viewCount={viewCount?? 0}
        videoUrl={videoUrl}
        videoTitle={title}
        owner={owner}
        videoDescription={description}
        videos={videos ?? []}
        duration={duration ?? 0}
        favoriteCount={favoriteCount ?? 0}
      />
    </div>
  );
};

export default VideoItem;
