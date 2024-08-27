import React, { useState, useContext, useEffect } from 'react';
import { API } from 'aws-amplify';
import Button from './Button';
import VideoItem from './VideoItem';
import { videoData } from '../utils/content';
import { useTranslation } from 'react-i18next';
import VideoModal from './VideoModal';
import { managementFavoriteCount, incrementViewCount, createFavorite, deleteFavorite } from '../graphql/mutations';
import { listFavorites } from '../graphql/queries';
import { UserContext } from '../contexts/UserContext';
import { FaPlay } from "react-icons/fa";
import { IoMdAdd, IoMdArrowDropdown } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { idText } from 'typescript';

export type VideoDetailModalProps = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  videoTitle: string;
  viewCount: number;
  videoDescription: string;
  imgSrc: string;
  videoUrl: string;
  duration: number;
  videos: any[];
  owner: string;
  favoriteCount: number;
}

const VideoDetailModal: React.FC<VideoDetailModalProps> = ({
  id,
  isOpen,
  onClose,
  imgSrc,
  videoTitle,
  videoDescription,
  viewCount,
  videos,
  duration,
  owner,
  videoUrl,
  favoriteCount
}) => {
  const [isDescriptionVisible, setDescriptionVisible] = useState<boolean>(false);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [hasIncremented, setHasIncremented] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isMyVideo, setIsMyVideo] = useState<boolean>(false);
  const { t } = useTranslation();

  const userContext = useContext(UserContext);
  
  if (!userContext) {
    throw new Error("userContext must be used within an AuthProvider!")
  }
    
  const { user } = userContext;

  const handleOpenModal = () => {
    incrementVideoViewCount();
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);
  const toggleDescription = () => setDescriptionVisible(!isDescriptionVisible);

  useEffect(() => {
    setIsMyVideo(owner === user?.username);
    checkIfFavorited(id)
  }, [])

  const checkIfFavorited = async (videoId: string) => {
     if (!user) return;
    try {
      const favoritesData = await API.graphql({
        query: listFavorites,
        variables: {
          filter: {
            userId: { eq: user.sub },
            videoId: { eq: videoId },
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      }) as { data: { listFavorites: { items: any[] } } };

      setIsFavorited(favoritesData.data.listFavorites.items.length > 0);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const handleFavoriteClick = async () => {
    if (!user) return;
    try {
      if (isFavorited) {
        console.log('Removing from favorites');
        // Remove from favorites
        const favoritesData = await API.graphql({
          query: listFavorites,
          variables: {
            filter: {
              userId: { eq: user.sub },
              videoId: { eq: id },
            },
          },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        }) as { data: { listFavorites: { items: any[] } } };

        if (favoritesData.data.listFavorites.items.length > 0) {
          const favoriteId = favoritesData.data.listFavorites.items[0].id;
          console.log(`Deleting favorite with id: ${favoriteId}`);
          await API.graphql({
            query: deleteFavorite,
            variables: { input: { id: favoriteId } },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
          });

          setIsFavorited(false);
          // Update favorite count in the backend
          await API.graphql({
            query: managementFavoriteCount,
            variables: {
                id: id,
                favoriteCount: favoriteCount - 1,
            },
            authMode: 'AMAZON_COGNITO_USER_POOLS',
          });
        }
      } else {
        console.log('Adding to favorites');
        // Add to favorites
        await API.graphql({
          query: createFavorite,
          variables: {
            input: {
              userId: user.sub,
              videoId: id,
            },
          },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        });
        setIsFavorited(true);
        // Update favorite count in the backend
        await API.graphql({
          query: managementFavoriteCount,
            variables: {
              id: id,
              favoriteCount: favoriteCount + 1,
          },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        });
      }
    } catch (error) {
      console.error('Error handling favorite:', error);
    }
  };

  const incrementVideoViewCount = async () => {
    if (hasIncremented || viewCount === undefined) return;

    try {
      await API.graphql({
        query: incrementViewCount,
        variables: {
          id: id,
          viewCount: viewCount + 1,
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      setHasIncremented(true); // Ensure it only increments once per play
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999] bg-black bg-opacity-70 pt-[120px] pb-[80px]">
      <div className="relative bg-[#131515] w-11/12 md:w-3/4 lg:w-2/3 rounded-lg h-full overflow-y-scroll video-modal">
        <div className='relative video-detail'>
          <img src={imgSrc} alt={videoTitle} className='w-full h-auto rounded-t-lg' />
          <div className='video-info absolute bottom-9 left-12 z-10'>
            <h6 className='h6 text-white mb-4'>{videoTitle}</h6>
            <div className='flex items-center justify-start gap-4'>
              <Button 
                label={t('Play')}
                icon={FaPlay}
                onClick={handleOpenModal}
                iconExist
                full
              />
              <button className='w-12 h-12 border border-[#c7a76b] rounded-full flex items-center justify-center'>
                <IoMdAdd className='text-[#c7a76b]' size={20} />
              </button>
              {!isMyVideo &&
                <button className={`w-12 h-12 border border-[#c7a76b] rounded-full flex items-center justify-center`} onClick={handleFavoriteClick}>
                  {isFavorited ? <MdFavorite className='text-[#c7a76b]' size={20} /> : <MdFavoriteBorder className='text-[#c7a76b]' size={20} />}
                </button>
              }
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:opacity-90 focus:outline-none absolute top-4 right-4 w-8 h-8 rounded-full b-gray-800 z-20 flex items-center justify-center transition-opacity"
        >
          &times;
        </button>
        <div className="px-4 md:px-8 lg:px-12 pt-5 pb-12">
          <div className='flex items-center justify-start gap-4'>
            <h6 className='sub-2b text-white'>{t("handle")} @~~~</h6>
            {!isMyVideo &&
              <button className='relative w-fit px-3 py-2 rounded border border-[#c7a76b] flex items-center justify-center button-4b brand-600 gap-1' onClick={handleFavoriteClick}>
                <IoMdAdd className='text-[#c7a76b]' size={16} /> {t("My Favorite")}
              </button>
              }
          </div>
         
          <div className='flex flex-row items-center mt-4 mb-2 gap-4'>
             <p className='text-white body-1r flex items-center gap-4 flex-row'><span>{2005}</span><span>{Math.floor(duration / 60)}m {duration % 60}s</span></p>
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
          <p className='text-white text-4xl'>{videoTitle}</p>
          <p className='text-white my-2'>{videoDescription}</p>
          <div
            className='flex items-center justify-start gap-4 mb-2 cursor-pointer'
            onClick={toggleDescription}
          >
            <IoMdArrowDropdown className='brand-600' size={14}/>
            <p className='brand-600 text-[12px] font-bold'>{isDescriptionVisible ? t('less details') : t('more details')}</p>
          </div>
          <p
            className={`text-white body-1r transition-opacity duration-300 mb-4`}
            style={{ opacity: isDescriptionVisible ? 1 : 0, maxHeight: isDescriptionVisible ? '100%' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease-out, opacity 0.3s ease-out' }}
          >
            {videoDescription}
          </p>
          <div>
            <h6 className='text-white sub-2b mb-4'>{t("More Like This")}</h6>
            <div className="video-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((item, index) => (
                <VideoItem
                  key={index}
                  id={item.id}
                  owner={item.owner}
                  videoUrl={item.videoUrl}
                  imageSrc={item.thumbnailUrl}
                  videos={videos}
                  title={item.title}
                  description={item.description}
                  viewCount={item.viewCount}
                  duration={item?.duration}
                  favoriteCount={item?.favoriteCount}
              />
              ))}
          </div>
          </div>
        </div>
      </div>
      <VideoModal show={showModal} onClose={handleCloseModal} videoUrl={videoUrl} />
    </div>
  );
};

export default VideoDetailModal;
