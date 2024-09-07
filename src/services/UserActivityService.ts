import { API } from 'aws-amplify';
import { listUserActivities, updateUserProgressMutation } from '../graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { VideoProps } from '../types';

export type ContinueWatchingVideo = {
  id: string;
  userId: string;
  videoId: string;
  progress: number;
  lastWatchedAt: string;
  createdAt: string;
  video: VideoProps;
}


export async function updateUserProgress(userId: string, videoId: string, progress: number): Promise<void> {
  try {
    await API.graphql({
      query: updateUserProgressMutation,
      variables: { userId, videoId, progress },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    });
  } catch (error) {
    console.error('Error updating user progress:', error);
    throw error;
  }
}

export async function getUserProgress(userId: string): Promise<any[]> {
  try {
    const result = (await API.graphql({
      query: listUserActivities,
      variables: { userId},
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    })) as GraphQLResult<{ getUserProgress: any[] }>; 
    if (result.data && result.data.getUserProgress) {
      return result.data.getUserProgress;
    } else {
      throw new Error('No progress data found.');
    }
  } catch (error) {
    console.error('Error fetching user progress:', error);
    throw error;
  }
}

export const getContinueWatchingVideos = async (userId: string): Promise<ContinueWatchingVideo[]> => {
  try {
    const result = await API.graphql({
      query: listUserActivities,
      variables: { userId },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    }) as { data: { listUserActivities: { items: ContinueWatchingVideo[] } } };

    const continueWatchingVideos = result.data.listUserActivities.items.filter(
      (activity) => activity.progress > 0 && activity.progress < activity.video.duration
    );

    const uniqueVideos = Array.from(
      continueWatchingVideos.reduce((map, item) => {
        if (!map.has(item.videoId)) {
          map.set(item.videoId, item);
        }
        return map;
      }, new Map<string, ContinueWatchingVideo>()).values()
    );

    return uniqueVideos;
  } catch (error) {
    console.error('Error fetching continue watching videos:', error);
    throw new Error('Failed to fetch continue watching videos.');
  }
};
