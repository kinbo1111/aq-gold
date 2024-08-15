// src/services/VideoService.ts
import { API, graphqlOperation } from 'aws-amplify';
import { createVideo } from '../graphql/mutations';
import { getVideo } from '../graphql/queries';

export type VideoData =  {
  title: string;
  description?: string;
  tags?: string[];
  category?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  isForKids: boolean;
  isRestricted: boolean;
  playlist: string;
  scheduleTime: string;
  timezone: string;
}

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
    console.log(response)
  } catch (error) {
    console.error('Error saving video metadata:', error);
    throw new Error('Failed to save video metadata.');
  }
}


// export async function fetchVideoById(id: string): Promise<void> {
//   try {
//     const response = await API.graphql({
//       query: getVideo,
//       variables: { id },
//       authMode: 'AMAZON_COGNITO_USER_POOLS',
//     });
//     console.log(response)
//     // const videoData = response?.data?.getVideo;

//     // if (videoData) {
//     //   return videoData;
//     // } else {
//     //   throw new Error('No video data returned.');
//     // }
//   } catch (error) {
//     console.error('Error fetching video:', error);
//     throw new Error('Failed to fetch video.');
//   }
// }


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