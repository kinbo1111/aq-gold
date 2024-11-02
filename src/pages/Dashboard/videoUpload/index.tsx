import * as React from 'react';
import { useState } from 'react';
import { message } from 'antd';
import DashboardContainer from '../../../components/DashboardContainer';
import VideoUploadModal from './VideoUploadModal';
import VideoUploadDetail from './VideoUploadDetail';
import VideoUploadVisibility from './VideoUploadVisibility';
import VideoUploadSchedule from './VideoUploadSchedule';
import { uploadVideoWithProgress, uploadThumbnail, uploadVthumbnail, getVideoUrl, getThumbnailUrl } from '../../../services/storageService';
import { saveVideoMetadata } from '../../../services/VideoService';
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';

export type VideoDetailData =  {
  title: string;
  description?: string;
  category?: string;
  vThumbnail?: File;
  thumbnail?: File;
  isForKids: boolean;
  isRestricted: boolean;
  playlist: string;
  channelId: string;
}

export type Thumbnail = {
  src: string | null;
  alt: string | null;
}

export type ScheduleDataProps = {
  publishNow: boolean;
  scheduleDate: string;
  scheduleTime: string;
  timezone: string;
}

const VideoUpload: React.FC = () => {
  const navigate = useNavigate();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(true);
  const [isUploadDetailOpen, setIsUploadDetailOpen] = useState(false);
  const [isUploadVisibilityOpen, setIsUploadVisibilityOpen] = useState(false);
  const [isUploadScheduleOpen, setIsUploadScheduleOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoDetail, setVideoDetail] = useState<VideoDetailData | null>(null);
  const [videoScheduleTime, setVideoScheduleTime] = useState<string>();
  const [videoUrl, setVideoUrl] = useState<string>();
  const [videoThumbnail, setVideoThumbnail] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [videoVthumbnail, setVideoVthumbnail] = useState<string>();
  const [publishNow, setPublishNow] = useState<boolean>(false)

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
    setSelectedFile(null);
    navigate('/aq-studio?tab=1');
  };

  const handleUpload = (file: File) => {
    setSelectedFile(file);
    setIsUploadModalOpen(false);
    setIsUploadDetailOpen(true);
  };

  const handleNextUploadDetail = (detail: VideoDetailData | null) => {
    setVideoDetail(detail);
    setIsUploadDetailOpen(false);
    setIsUploadVisibilityOpen(true);
  };

  const handleOpenSchedule = async (scheduleData: ScheduleDataProps | null) => {
    try {
      if (selectedFile === null || !videoDetail?.thumbnail || !videoDetail?.vThumbnail) {
        message.error('Please select both a video and a thumbnail file to upload.');
        return;
      }

    if (!scheduleData) {
      message.error('Schedule data is missing.');
      return;
    }

      setIsLoading(true);

      const { publishNow, scheduleDate, scheduleTime, timezone } = scheduleData;
      setPublishNow(publishNow);

      const validScheduleDate = typeof scheduleDate === 'string' ? scheduleDate : '2027-01-01'; 
      const localDateTime = DateTime.fromISO(`${validScheduleDate.split('T')[0]}T${scheduleTime}`, { zone: timezone });
      const scheduledDateTime = localDateTime.setZone('UTC+9').toISO();

      const videoKey = await uploadVideoWithProgress(selectedFile, setVideoProgress);
      const videoUrl = await getVideoUrl(videoKey);

      const thumbnailKey = await uploadThumbnail(videoDetail.thumbnail);
      const thumbnailUrl = await getThumbnailUrl(thumbnailKey);
      
      const vThumbnailKey = await uploadVthumbnail(videoDetail.vThumbnail);
      const vThumbnailUrl = await getThumbnailUrl(vThumbnailKey);
    
      setVideoScheduleTime(scheduledDateTime ?? "");
      setVideoUrl(videoUrl);
      setVideoThumbnail(thumbnailUrl);
      setVideoVthumbnail(vThumbnailUrl);

      const videoElement = document.createElement('video');
      videoElement.src = URL.createObjectURL(selectedFile);

      videoElement.onloadedmetadata = async () => {
        const duration = Math.floor(videoElement.duration);
       
        await saveVideoMetadata({
          title: videoDetail.title,
          description: videoDetail.description,
          category: videoDetail.category,
          videoUrl,
          thumbnailUrl,
          vThumbnailUrl,
          isForKids: videoDetail.isForKids,
          isRestricted: videoDetail.isRestricted,
          playlist: videoDetail.playlist,
          channelId: videoDetail.channelId,
          scheduleTime: scheduledDateTime ?? "",
          timezone,
          isPublic: publishNow ?? false,
          duration,
          viewCount: 0,
          favoriteCount: 0,
        });

        message.success('Video and thumbnail uploaded successfully!');
        setIsUploadScheduleOpen(true);
      };
    } catch (error) {
      message.error('Error uploading video or thumbnail.');
    } finally {
      setIsLoading(false);
      setIsUploadVisibilityOpen(false);
    }
  };

  const handleCloseUploadSchedule = () => {
    setIsUploadScheduleOpen(false)
    navigate('/aq-studio?tab=2');
    
  } 

  const handleCloseUploadDetail = () => {
    setIsUploadDetailOpen(false)
    navigate('/aq-studio?tab=2');
  }

  const handleCloseUploadVisibility = () => {
    setIsUploadVisibilityOpen(false); 
    setIsUploadDetailOpen(true);
  }

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
        isLoading={isLoading}
        uploadProgress={videoProgress}
      />
      <VideoUploadSchedule
        isOpen={isUploadScheduleOpen}
        publishNow={publishNow}
        onClose={ handleCloseUploadSchedule}
        videoScheduleTime={videoScheduleTime ?? ''}
        videoUrl={videoUrl ?? ''}
        videoTitle={videoDetail?.title ?? ''}
        thumbnailUrl={videoThumbnail ?? ''}
      />
    </DashboardContainer>
  );
};

export default VideoUpload;
