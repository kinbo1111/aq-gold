import { API, graphqlOperation } from 'aws-amplify';
import { createVideo } from '../graphql/mutations';
import { listVideos } from '../graphql/queries';

interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
}

interface CreateVideoResponse {
  createVideo: Video;
}

interface ListVideosResponse {
  listVideos: {
    items: Video[];
  };
}

export async function createNewVideo(videoData: any): Promise<Video> {
  try {
    const response = (await API.graphql(graphqlOperation(createVideo, { input: videoData }))) as { data: CreateVideoResponse };

    if (response.data && response.data.createVideo) {
      return response.data.createVideo;
    } else {
      throw new Error('Failed to create video. No data returned.');
    }
  } catch (error) {
    console.error('Error creating video:', error);
    throw error;
  }
}

export async function fetchVideos(): Promise<Video[]> {
  try {
    const response = await API.graphql({
          query: listVideos,
          variables: { filter: { isPublic: { eq: true } } },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        }) as { data: ListVideosResponse };
    if (response.data && response.data.listVideos) {
      return response.data.listVideos.items;
    } else {
      throw new Error('Failed to fetch videos. No data returned.');
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
}
