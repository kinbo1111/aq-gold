import React, { useState } from 'react';
import { FaPlay } from "react-icons/fa";
import { IoMdAdd, IoMdArrowDropdown } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import Button from './Button';
import VideoItem from './VideoItem';
import { videoData } from '../utils/content';
import { useTranslation } from 'react-i18next';

interface VideoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle: string;
  videoDescription: string;
  imgSrc: string;
}

const VideoDetailModal: React.FC<VideoDetailModalProps> = ({
  isOpen,
  onClose,
  imgSrc,
  videoTitle,
  videoDescription,
}) => {
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);
  const { t } = useTranslation();
  const toggleDescription = () => {
    setDescriptionVisible(!isDescriptionVisible);
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
                onClick={() => {}}
                iconExist
                full
              />
              <button className='w-12 h-12 border border-[#c7a76b] rounded-full flex items-center justify-center'>
                <IoMdAdd className='text-[#c7a76b]' size={20} />
              </button>
              <button className='w-12 h-12 border border-[#c7a76b] rounded-full flex items-center justify-center'>
                <MdFavorite className='text-[#c7a76b]' size={20} />
              </button>
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
            <button className='relative w-fit px-3 py-2 rounded border border-[#c7a76b] flex items-center justify-center button-4b brand-600 gap-1'>
              <IoMdAdd className='text-[#c7a76b]' size={16} /> {t("My Favorite")}
            </button>
          </div>
          <p className='text-white body-1r flex items-center gap-4 mt-4 mb-2'><span>2005</span><span>1h 54m</span></p>
          <p className='text-white text-4xl'>{t("Movie Name")}</p>
          <p className='text-white my-2'>This is movie descriptioon. This is movie descriptioon. This is movie descriptioon. This is movie descriptioon.</p>
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
              {videoData.map((item, index) => (
              <VideoItem
                  key={index}
                  imageSrc={item.imageSrc}
                  title={item.title}
                  description={item.description}
                  icon
              />
              ))}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailModal;
