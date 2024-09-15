import * as React from 'react';
import { useState } from 'react';
import DashboardContainer from "../../../components/DashboardContainer";
import VideoUploadModal from './VideoUploadModal';
import VideoUploadDetail from './VideoUploadDetail';
import VideoUploadVisibility from './VideoUploadVisibility';
import VideoUploadSchedule from './VideoUploadSchedule';
import { uploadVideo, uploadThumbnail, getVideoUrl, getThumbnailUrl } from '../../../services/storageService';
import { saveVideoMetadata } from '../../../services/VideoService';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

export type VideoDetailData =  {
  title: string;
  description?: string;
  category?: string;
  thumbnail?: File;
  isForKids: boolean;
  isRestricted: boolean;
  playlist: string;
  channelId: string;
}

export type Thumbnail = {
  src: string;
  alt: string;
}

export type ScheduleDataProps = {
  publishNow: boolean;
  scheduleDate: string;
  scheduleTime: string;
  timezone: string;
}

const VideoUpload: React.FC = () => {
  const navigate = useNavigate();
  const [isUploadModalOpen, setIsUploadModalOpen]  = useState(true);
  const [isUploadDetailOpen, setIsUploadDetailOpen] = useState(false);
  const [isUploadVisibilityOpen, setIsUploadVisibilityOpen] = useState(false);
  const [isUploadScheduleOpen, setIsUploadScheduleOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoDetail, setVideoDetail] = useState<VideoDetailData | null>(null);
  const [videoSchedule, setVideoSchedule] = useState<ScheduleDataProps | null>(null);
  const [videoScheduleTime, setVideoScheduleTime] = useState<string>();
  const [timezone, setTimeZone] = useState<string>('Japan (GMT＋0700)');
  const [videoUrl, setVideoUrl] = useState<string>();
  const [videoThumbnail, setVideoThumbnail] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
    setSelectedFile(null);
    navigate('/aq-studio?tab=1')

  };

  const handleUpload = (file: File) => {
    setSelectedFile(file);
    setIsUploadModalOpen(false);
    setIsUploadDetailOpen(true);
  };
  
  const handleCloseUploadDetail = () => {
      setIsUploadDetailOpen(false);
      navigate('/aq-studio?tab=1')
      setSelectedFile(null);
    };

  const handleNextUploadDetail = (detail: VideoDetailData | null) => {
    setVideoDetail(detail)
    setIsUploadDetailOpen(false);
    setIsUploadVisibilityOpen(true);
  };

  const handleCloseUploadVisibility = () => {
    setIsUploadVisibilityOpen(false);
    setIsUploadDetailOpen(true);
    setIsUploadVisibilityOpen(false);
    }
  
    const handleCloseUploadSchedule = () => {
      setIsUploadScheduleOpen(false);
      navigate('/aq-studio?tab=1')
    }
   
  const handleOpenSchedule = async (scheduleData: ScheduleDataProps | null) => {  
    try {
      setVideoSchedule(scheduleData)
      if (selectedFile === null || videoDetail?.thumbnail === undefined) {
        message.error('Please select both a video and a thumbnail file to upload.');
        return;
      }
      setIsLoading(true);
      const scheduleTimeISO = scheduleData?.scheduleDate 
      ? new Date(scheduleData.scheduleDate + ' ' + scheduleData?.scheduleTime).toISOString() 
      : new Date().toISOString();
      
      const videoKey = await uploadVideo(selectedFile);
      const videoUrl = await getVideoUrl(videoKey);
      const thumbnailKey = await uploadThumbnail(videoDetail?.thumbnail);
      const thumbnailUrl = await getThumbnailUrl(thumbnailKey);
      const videoElement = document.createElement('video');
      
      setTimeZone(scheduleData?.timezone ?? 'Japan (GMT＋0700)')
      videoElement.src = URL.createObjectURL(selectedFile); 
      
      videoElement.onloadedmetadata = async () => {
        const duration = Math.floor(videoElement.duration);
        setVideoScheduleTime(scheduleTimeISO);
        setVideoUrl(videoUrl);        
        setVideoThumbnail(thumbnailUrl);
        await saveVideoMetadata({
          title: videoDetail?.title,
          description: videoDetail?.description,
          category: videoDetail?.category,
          videoUrl,
          thumbnailUrl,
          isForKids: videoDetail?.isForKids,
          isRestricted: videoDetail?.isRestricted,
          playlist: videoDetail?.playlist,
          channelId: videoDetail?.channelId,
          scheduleTime: scheduleTimeISO,
          timezone: timezone,
          isPublic: scheduleData?.publishNow ??  false,
          duration,
          viewCount: 0,
          favoriteCount: 0,
        });

        message.success('Video and thumbnail uploaded successfully!');
        setIsUploadScheduleOpen(true);
      }
    } catch (error: any) {
      message.warning(error.message || 'An unexpected error occurred.');
    } finally {
      setIsUploadVisibilityOpen(false);
      setIsLoading(false);
      }
    };
   
    return (
        <DashboardContainer>  
        <VideoUploadModal
          isOpen={isUploadModalOpen}      
          onClose={handleCloseUploadModal}    
          onUpload={handleUpload}
        />
        <VideoUploadDetail
          file={selectedFile}
          isOpen={isUploadDetailOpen}
          onClose={handleCloseUploadDetail}
          onNext={handleNextUploadDetail} 
        />
        <VideoUploadVisibility
          videoTitle={videoDetail?.title ?? ''}
          isOpen={isUploadVisibilityOpen}
          onClose={handleCloseUploadVisibility}
          onSchedule={handleOpenSchedule}
          isLoading = {isLoading}
        />
        <VideoUploadSchedule
          isOpen={isUploadScheduleOpen}
          onClose={handleCloseUploadSchedule}
          videoScheduleTime={videoScheduleTime ?? ''}
          videoUrl={videoUrl ?? ''}
          videoTitle={videoDetail?.title ?? ''}
          thumbnailUrl={videoThumbnail ?? ''}  
        />
        </DashboardContainer>
    );
};

export default VideoUpload;
