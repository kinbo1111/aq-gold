import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { fetchAllVideos, getFavoriteVideos } from '../services/VideoService';
import { VideoData } from '../types';

export type VideoContextType = {
  videos: VideoData[];
  newVideos: VideoData[];
  popularVideos: VideoData[];
  topVideos: VideoData[];
  recommendVideos: VideoData[];
  searchedVideos: VideoData[];
  favoriteVideos: VideoData[];
  filterVideosByCategory: (category: string) => {
    filteredNewVideos: VideoData[];
    filteredPopularVideos: VideoData[];
    filteredTopVideos: VideoData[];
    filteredRecommendVideos: VideoData[];
    filteredMyList: VideoData[];
  };
  searchVideo: (keyword: string) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};

export const VideoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [newVideos, setNewVideos] = useState<VideoData[]>([]);
  const [popularVideos, setPopularVideos] = useState<VideoData[]>([]);
  const [topVideos, setTopVideos] = useState<VideoData[]>([]);
  const [recommendVideos, setRecommendVideos] = useState<VideoData[]>([]);
  const [searchedVideos, setSearchedVideos] = useState<VideoData[]>([]);
  const [favoriteVideos, setFavoriteVideos] = useState<VideoData[]>([]);

  
  const fetchVideo = useCallback(async () => {
    try {
      const allVideos = await fetchAllVideos(); 
      const favoriteList = await getFavoriteVideos(); 
 
      const favorites = await allVideos.filter(video => 
        favoriteList.some(favorite => favorite === video.id)
      );
     
      setFavoriteVideos(favorites);
      setVideos(allVideos);
      setNewVideos(allVideos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5));
      setPopularVideos(allVideos.sort((a, b) => b.viewCount - a.viewCount).slice(0, 5));
      setTopVideos(allVideos.sort((a, b) => b.favoriteCount - a.favoriteCount).slice(0, 5));
      setRecommendVideos(allVideos.sort((a, b) => b.duration - a.duration).slice(0, 5));
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  useEffect(() => {
    fetchVideo();
  }, [fetchVideo]);

  const filterVideosByCategory = (category: string) => {
    const filterByCategory = (videos: VideoData[]) => {
      return videos.filter(video => video.category && video.category.toLowerCase() === category.toLowerCase());
    };

    return {
      filteredNewVideos: filterByCategory(newVideos),
      filteredPopularVideos: filterByCategory(popularVideos),
      filteredTopVideos: filterByCategory(topVideos),
      filteredRecommendVideos: filterByCategory(recommendVideos),
      filteredMyList: filterByCategory(favoriteVideos)
    };
  };

  const searchVideo = (keyword: string): void => {
    setSearchedVideos(videos.filter(video => video.title.toLowerCase().includes(keyword.toLowerCase())));
  };

  return (
    <VideoContext.Provider value={{ 
      videos, 
      newVideos, 
      popularVideos, 
      topVideos, 
      recommendVideos, 
      searchedVideos, 
      favoriteVideos,
      filterVideosByCategory, 
      searchVideo   
    }}>
      {children}
    </VideoContext.Provider>
  );
};
