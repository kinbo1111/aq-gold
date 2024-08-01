import * as React from 'react';
import { useState } from 'react';
import DashboardContainer from "../../../components/DashboardContainer";
import VideoUploadModal from './VideoUploadModal';
import VideoUploadDetail from './VideoUploadDetail';
import VideoUploadVisibility from './VideoUploadVisibility';
import VideoUploadSchedule from './VideoUploadSchedule';

const VideoUpload: React.FC = () => {
    const [isUploadModalOpen, setIsUploadModalOpen]  = useState(true);
    const [isUploadDetailOpen, setIsUploadDetailOpen] = useState(false);
    const [isUploadVisibilityOpen, setIsUploadVisibilityOpen] = useState(false);
    const [isUploadScheduleOpen, setIsUploadScheduleOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

    const handleNextUploadDetail = () => {
      setIsUploadDetailOpen(false);
      setIsUploadVisibilityOpen(true);
    };

    const handleCloseUploadVisibility = () => {
      setIsUploadVisibilityOpen(false);
    }
  
    const handleCloseUploadSchedule = () => {
      setIsUploadScheduleOpen(false);
    }
   
    const handleOpenSchedule = () => {
      setIsUploadScheduleOpen(true);
      setIsUploadVisibilityOpen(false);
    }

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
             />
            <VideoUploadSchedule
              isOpen={isUploadScheduleOpen}
              onClose={handleCloseUploadSchedule}
            />
        </DashboardContainer>
    );
};

export default VideoUpload;
