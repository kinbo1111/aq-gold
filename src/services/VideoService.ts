import { API } from 'aws-amplify';
import { createVideo } from '../graphql/mutations';
import { videosByFavoriteCount, updateVideo } from '../graphql/mutations';
import { listVideos } from '../graphql/queries';
import { getVideo } from '../graphql/queries';
import { VideoData, VideoInputData, VideoUpdateData} from '../types';
import { listFavorites } from '../graphql/queries';

export type GetVideoResponse = {
  getVideo: VideoInputData;
}

export async function saveVideoMetadata(videoData: VideoInputData): Promise<void> {
  try {
    await API.graphql({
      query: createVideo, 
      variables: { input: videoData },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    });
  } catch (error) {
    console.error('Error saving video metadata:', error);
    throw new Error('Failed to save video metadata.');
  }
}

export async function updateVideoMetadata(videoData: VideoUpdateData): Promise<void> {
  try {
    await API.graphql({
      query: updateVideo,
      variables: { input: videoData },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
  } catch (error) {
    console.error('Error updating video metadata:', error);
  }
}



export async function fetchVideoById(id: string): Promise<VideoInputData> {
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

export const fetchTopContent = async (limit: number = 10): Promise<VideoInputData[]> => {
  try {
    const response = await API.graphql({
      query: videosByFavoriteCount,
      variables: {
        limit,
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    }) as { data: { listVideos: { items: VideoInputData[] } } };

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

export const getFavoriteVideos = async (): Promise<string[]> => {
  try {
    const { data } = await API.graphql<
      { listFavorites: { items: { videoId: string }[] } }
    >({
      query: listFavorites,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    }) as {
      data: {
        listFavorites: {
          items: Array<{
            id: string,
            userId: string,
            videoId: string,
            createdAt?: string | null,
            updatedAt: string,
            owner?: string | null
          }> } } };

    return data.listFavorites.items.map(item => item.videoId);
  } catch (error) {
    throw new Error('Error fetching favorite videos');
  }
};
