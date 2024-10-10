import { FavoriteChannel, Channel, channelInputProps } from '../types';
import { API, graphqlOperation } from 'aws-amplify';
import { listFavoriteChannels, getChannel, listChannels, listVideos } from '../graphql/queries';
import { createFavoriteChannel, deleteFavoriteChannel, createChannel, updateChannel, deleteChannel, deleteVideo } from '../graphql/mutations';
import { message } from 'antd';

export const fetchFavoriteChannels = async (userId: string): Promise<FavoriteChannel[]> => {
  try {
    const response = await API.graphql({
      query: listFavoriteChannels,
      variables: { filter: { userId: { eq: userId } } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }) as { data: { listFavoriteChannels: { items: FavoriteChannel[] } } };

    return response.data.listFavoriteChannels.items;
  } catch (error) {
    console.error('Error fetching favorite channels:', error);
    throw new Error('Failed to fetch favorite channels');
  }
};

export const getChannelById = async (channelId: string) => {
  try {
    const response = await API.graphql({
      query: getChannel,
      variables: { id: channelId }, 
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }) as { data: { getChannel: Channel } };

    return response.data.getChannel.description;
  } catch (error) {
    console.error('Error fetching channel data:', error);
    throw new Error('Failed to fetch channel data');
  }
};


export const createNewChannel = async (channelData: any) => {
  try {
    const response = await API.graphql({
      query: createChannel,
      variables: { input: channelData },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    }) as { data: { createChannel: any } };

    return response.data.createChannel;
  } catch (error) {
    console.error('Error creating channel:', error);
    throw new Error('Failed to create channel');
  }
};

export const fetchUserChannel = async (userId: string) => {
  try {
    const response = await API.graphql({
      query: listChannels,
      variables: { filter: { owner: { eq: userId } } },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    }) as { data: { listChannels: any } };
    return response.data.listChannels.items[0]; 
  } catch (error) {
    console.error('Error fetching user channel:', error);
    throw new Error('Failed to fetch channel');
  }
};

export const addChannelToFavorites = async (userId: string, channelOwnerId: string): Promise<FavoriteChannel> => {
  try {
    const response = await API.graphql(
      graphqlOperation(createFavoriteChannel, {
        input: {
          userId,
          channelOwnerId,
        },
      })
    ) as { data: { createFavoriteChannel: FavoriteChannel } };
    return response.data.createFavoriteChannel;
  } catch (error) {
    console.error('Error adding channel to favorites:', error);
    throw new Error('Failed to add channel to favorites');
  }
};

export const removeChannelFromFavorites = async (favoriteChannelId: string): Promise<void> => {
  try {
    await API.graphql(
      graphqlOperation(deleteFavoriteChannel, {
        input: {
          id: favoriteChannelId,
        },
      })
    );
  } catch (error) {
    console.error('Error removing channel from favorites:', error);
    throw new Error('Failed to remove channel from favorites');
  }
};

export const fetchAllChannels = async (): Promise<Channel[]> => {
  try {
    const response = await API.graphql(
      graphqlOperation(listChannels)
    ) as { data: { listChannels: { items: Channel[] } } };
    return response.data.listChannels.items;
  } catch (error) {
    console.error('Error fetching channels:', error);
    throw new Error('Failed to fetch channels');
  }
};

export const updateChannelDetails = async (channelData: channelInputProps) => {
  try {
    const response = await API.graphql({
      query: updateChannel,
      variables: { input: channelData },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    }) as { data: { updateChannel: channelInputProps } };
    return response.data.updateChannel;
  } catch (error) {
    console.error('Error updating channel:', error);
    throw new Error('Failed to update channel');
  }
};

const deleteChannelVideos = async (channelId: string) => {
  const response = await API.graphql({
    query: listVideos,
    variables: { filter: { channelId: { eq: channelId } } },
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  }) as { data: { listVideos: { items: any[] } } };

  const videos = response.data.listVideos.items;
  for (const video of videos) {
    await API.graphql({
      query: deleteVideo,
      variables: { input: { id: video.id } },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    });
  }
};

export const deleteChannelById = async (channelId: string) => {
  try {
    await deleteChannelVideos(channelId);
    await API.graphql({
      query: deleteChannel,
      variables: { input: { id: channelId } },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    });
    
    message.success("Channel deleted successfully!");
  } catch (error) {
    console.error('Error deleting channel:', error);
    throw new Error('Failed to delete channel');
  }
};