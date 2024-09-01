// src/services/VideoService.ts
import { API, graphqlOperation } from 'aws-amplify';
import { createVideo } from '../graphql/mutations';
import { videosByFavoriteCount } from '../graphql/queries';
import { listVideos } from '../graphql/queries';
import { getVideo } from '../graphql/queries';
import { VideoData } from '../types';

export type GetVideoResponse = {
  getVideo: VideoData;
}

export async function saveVideoMetadata(videoData: VideoData): Promise<void> {
  try {

    const response = await API.graphql({
      query: createVideo, 
      variables: { input: videoData },
      authMode: 'AMAZON_COGNITO_USER_POOLS',

    });
  } catch (error) {
    console.error('Error saving video metadata:', error);
    throw new Error('Failed to save video metadata.');
  }
}

export async function fetchVideoById(id: string): Promise<VideoData> {
  try {
    const response = await API.graphql({
      query: getVideo,
      variables: { id },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    });

    const videoData = (response as { data: GetVideoResponse }).data.getVideo;

    if (videoData) {
      return videoData;
    } else {
      throw new Error('No video data returned.');
    }
  } catch (error) {
    console.error('Error fetching video:', error);
    throw new Error('Failed to fetch video.');
  }
}

export const fetchTopContent = async (limit: number = 10): Promise<VideoData[]> => {
  try {
    const response = await API.graphql({
      query: videosByFavoriteCount,
      variables: {
        limit,
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    }) as { data: { listVideos: { items: VideoData[] } } };

    return response.data.listVideos.items;
  } catch (error) {
    console.error('Error fetching top videos by favorite count:', error);
    throw new Error('Failed to fetch top videos.');
  }
};

export const fetchAllVideos = async () => {
  try {
    const response = await API.graphql({
      query: listVideos,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    }) as { data: { listVideos: { items: VideoData[] } } };

    return response.data.listVideos.items;
  } catch (error) {
    console.error('Error fetching all videos:', error);
    throw new Error('Failed to fetch videos.');
  }
};