import * as React from 'react';
import { useState } from 'react';
import { message, Progress } from 'antd';
import DashboardContainer from '../../../components/DashboardContainer';
import VideoUploadModal from './VideoUploadModal';
import VideoUploadDetail from './VideoUploadDetail';
import VideoUploadVisibility from './VideoUploadVisibility';
import VideoUploadSchedule from './VideoUploadSchedule';
import { uploadVideoWithProgress, uploadThumbnail, getVideoUrl, getThumbnailUrl } from '../../../services/storageService';
import { saveVideoMetadata } from '../../../services/VideoService';
import { useNavigate } from 'react-router-dom';

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
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(true);
  const [isUploadDetailOpen, setIsUploadDetailOpen] = useState(false);
  const [isUploadVisibilityOpen, setIsUploadVisibilityOpen] = useState(false);
  const [isUploadScheduleOpen, setIsUploadScheduleOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoDetail, setVideoDetail] = useState<VideoDetailData | null>(null);
  const [videoScheduleTime, setVideoScheduleTime] = useState<string>();
  const [timezone, setTimeZone] = useState<string>('Japan (GMT＋0700)');
  const [videoUrl, setVideoUrl] = useState<string>();
  const [videoThumbnail, setVideoThumbnail] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [thumbnailProgress, setThumbnailProgress] = useState<number>(0);

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
      if (selectedFile === null || !videoDetail?.thumbnail) {
        message.error('Please select both a video and a thumbnail file to upload.');
        return;
      }

      setIsLoading(true);

      const scheduleTimeISO = scheduleData?.scheduleDate 
        ? new Date(scheduleData.scheduleDate + ' ' + scheduleData.scheduleTime).toISOString() 
        : new Date().toISOString();

      // Upload video with progress tracking
      const videoKey = await uploadVideoWithProgress(selectedFile, setVideoProgress);
      const videoUrl = await getVideoUrl(videoKey);

      // Upload thumbnail with progress tracking
      const thumbnailKey = await uploadThumbnail(videoDetail.thumbnail);
      const thumbnailUrl = await getThumbnailUrl(thumbnailKey);

      setVideoScheduleTime(scheduleTimeISO);
      setVideoUrl(videoUrl);
      setVideoThumbnail(thumbnailUrl);

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
          isForKids: videoDetail.isForKids,
          isRestricted: videoDetail.isRestricted,
          playlist: videoDetail.playlist,
          channelId: videoDetail.channelId,
          scheduleTime: scheduleTimeISO,
          timezone,
          isPublic: scheduleData?.publishNow ?? false,
          duration,
          viewCount: 0,
          favoriteCount: 0,
        });

        message.success('Video and thumbnail uploaded successfully!');
        setIsUploadScheduleOpen(true);
      };
    } catch (error) {
      message.error('Error uploading video or thumbnail.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      setIsUploadVisibilityOpen(false);
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
        onClose={() => setIsUploadDetailOpen(false)}
        onNext={handleNextUploadDetail}
      />
      <VideoUploadVisibility
        videoTitle={videoDetail?.title ?? ''}
        isOpen={isUploadVisibilityOpen}
        onClose={() => setIsUploadVisibilityOpen(false)}
        onSchedule={handleOpenSchedule}
        isLoading={isLoading}
        uploadProgress={videoProgress}
      />
      <VideoUploadSchedule
        isOpen={isUploadScheduleOpen}
        onClose={() => setIsUploadScheduleOpen(false)}
        videoScheduleTime={videoScheduleTime ?? ''}
        videoUrl={videoUrl ?? ''}
        videoTitle={videoDetail?.title ?? ''}
        thumbnailUrl={videoThumbnail ?? ''}
      />
    </DashboardContainer>
  );
};

export default VideoUpload;
