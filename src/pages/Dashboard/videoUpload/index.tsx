import * as React from 'react';
import { useState } from 'react';
import DashboardContainer from "../../../components/DashboardContainer";
import VideoUploadModal from './VideoUploadModal';
import VideoUploadDetail from './VideoUploadDetail';
import VideoUploadVisibility from './VideoUploadVisibility';
import VideoUploadSchedule from './VideoUploadSchedule';
import { uploadVideo, uploadThumbnail, getVideoUrl, getThumbnailUrl } from '../../../services/StorageService';
import { saveVideoMetadata } from '../../../services/VideoService';
import { message } from 'antd';


export type VideoDetailData =  {
  title: string;
  description?: string;
  category?: string;
  thumbnail?: File;
  isForKids: boolean;
  isRestricted: boolean;
  playlist: string;
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
    const [isUploadModalOpen, setIsUploadModalOpen]  = useState(true);
    const [isUploadDetailOpen, setIsUploadDetailOpen] = useState(false);
    const [isUploadVisibilityOpen, setIsUploadVisibilityOpen] = useState(false);
    const [isUploadScheduleOpen, setIsUploadScheduleOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [videoDetail, setVideoDetail] = useState<VideoDetailData | null>(null);
    const [videoSchedule, setVideoSchedule] = useState<ScheduleDataProps | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleOpenUploadModal = () => {
      setIsUploadModalOpen(true);
    };
  
    const handleCloseUploadModal = () => {
      setIsUploadModalOpen(false);
      setSelectedFile(null);
    };
  
    const handleUpload = (file: File) => {
      setSelectedFile(file);
      setIsUploadModalOpen(false);
      setIsUploadDetailOpen(true);
    };
  
  const handleCloseUploadDetail = () => {
      setIsUploadDetailOpen(false);
      setSelectedFile(null);
    };

  const handleNextUploadDetail = (detail: VideoDetailData | null) => {
    setVideoDetail(detail)
      setIsUploadDetailOpen(false);
      setIsUploadVisibilityOpen(true);
    };

    const handleCloseUploadVisibility = () => {
      setIsUploadVisibilityOpen(false);
    }
  
    const handleCloseUploadSchedule = () => {
      setIsUploadScheduleOpen(false);
    }
   
  const handleOpenSchedule = async (scheduleData: ScheduleDataProps | null) => {
      setVideoSchedule(scheduleData)
      
      
      if (selectedFile === null || videoDetail?.thumbnail === undefined ) {
          message.error('Please select both a video and a thumbnail file to upload.');
          return;
      }
    try {
      setIsLoading(true);
        const scheduleTimeISO = scheduleData?.scheduleDate ? new Date(scheduleData?.scheduleDate + ' ' + scheduleData?.scheduleTime).toISOString() : '';

        const videoKey = await uploadVideo(selectedFile);
        const videoUrl = await getVideoUrl(videoKey);
        const thumbnailKey = await uploadThumbnail(videoDetail?.thumbnail);
        const thumbnailUrl = await getThumbnailUrl(thumbnailKey);
        await saveVideoMetadata({
          title: videoDetail?.title,
          description: videoDetail?.description,
          category: videoDetail?.category,
          videoUrl,
          thumbnailUrl,
          isForKids: videoDetail?.isForKids,
          isRestricted: videoDetail?.isRestricted,
          playlist: videoDetail?.playlist,
          scheduleTime: scheduleTimeISO,
          timezone: scheduleData?.timezone?? '',
        });
        message.success('Video and thumbnail uploaded successfully!');
      } catch (error: any) {
        message.warning(error.message || 'An unexpected error occurred.');
        console.error('Error:', error);
      } finally {
        setIsUploadScheduleOpen(true);
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
                isOpen={isUploadDetailOpen}
                onClose={handleCloseUploadDetail}
                onNext={handleNextUploadDetail} 
              />
              <VideoUploadVisibility
                isOpen={isUploadVisibilityOpen}
                onClose={handleCloseUploadVisibility}
                onSchedule={handleOpenSchedule}
                isLoading = {isLoading}
             />
            <VideoUploadSchedule
              isOpen={isUploadScheduleOpen}
              onClose={handleCloseUploadSchedule}
            />
        </DashboardContainer>
    );
};

export default VideoUpload;
