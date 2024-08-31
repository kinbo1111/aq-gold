import { API } from 'aws-amplify';
import { getUserProgressQuery, updateUserProgressMutation } from '../graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql';


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
      query: getUserProgressQuery,
      variables: { userId },
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
