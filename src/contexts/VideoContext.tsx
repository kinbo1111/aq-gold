import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { fetchAllVideos } from '../services/VideoService';
import { VideoData } from '../types';
import { message } from 'antd';

interface VideoContextType {
    videos: VideoData[];
    newVideos: VideoData[];
    popularVideos: VideoData[];
    topVideos: VideoData[];
    recommendVideos: VideoData[];
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const useVideo = () => {
    const context = useContext(VideoContext);
    if (!context) {
      throw new Error('useVideo must be used within an VideoProvider');
    }
    return context;
  };
  
export const VideoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [videos, setVideos] = useState<VideoData[]>([]);
    const [newVideos, setNewVideos] = useState<VideoData[]>([]);
    const [popularVideos, setPopularVideos] = useState<VideoData[]>([]);
    const [topVideos, setTopVideos] = useState<VideoData[]>([]);
    const [recommendVideos, setRecommendVideos] = useState<VideoData[]>([]);
    const [loading, setLoading] = useState<Boolean>(false);

    const fetchVideo = useCallback(async () => {
        try {
            setLoading(true);
            const allVideos = await fetchAllVideos()
            await setVideos(allVideos);
            await setNewVideos([...videos].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).slice(0, 5)) 
            await setPopularVideos([...videos].sort((a, b) => a.viewCount - b.viewCount).slice(0, 5))
            await setTopVideos([...videos].sort((a, b) => a.favoriteCount - b.favoriteCount).slice(0, 5)) 
            await setRecommendVideos([...videos].sort((a, b) => a.duration - b.duration).slice(0, 5))
        } catch (error) {
            message.warning("Error!")
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchVideo()
    },[fetchVideo])
 
  
    return (
      <VideoContext.Provider value={{ videos, newVideos, popularVideos, topVideos, recommendVideos }}>
        {children}
      </VideoContext.Provider>
    );
  };