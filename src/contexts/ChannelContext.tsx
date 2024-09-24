import React, { createContext, useState, useContext, useEffect } from 'react';
import { useUser } from './UserContext';
import * as ChannelService from '../services/ChannelService';
import { FavoriteChannel, channelInputProps, channleDataProps } from '../types';
import { fetchUserChannel, createNewChannel, updateChannelDetails  } from '../services/ChannelService';

export type ChannelContextProps = {
  hasChannel: boolean;
  channelData: any;
  loadingChannel: boolean;
  favoriteChannels: FavoriteChannel[];
  loadingFavorites: boolean;
  updateChannel: (channelData: channleDataProps) => Promise<void>;
  createChannel: (channelData: any) => Promise<void>;
  checkUserChannel: () => Promise<void>;
  fetchFavoriteChannels: () => Promise<void>;
  addChannelToFavorites: (channelOwnerId: string) => Promise<void>;
  removeChannelFromFavorites: (favoriteChannelId: string) => Promise<void>;
}

const ChannelContext = createContext<ChannelContextProps | undefined>(undefined);

export const ChannelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const [favoriteChannels, setFavoriteChannels] = useState<any[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [hasChannel, setHasChannel] = useState<boolean>(false);
  const [channelData, setChannelData] = useState<any>(null);
  const [loadingChannel, setLoadingChannel] = useState<boolean>(true);

  const checkUserChannel = async () => {
    if (!user || user.sub === undefined) return;

    setLoadingChannel(true);
    try {
      const channel = await fetchUserChannel(user.sub);
      if (channel) {
        setHasChannel(true);
        setChannelData(channel);
      } else {
        setHasChannel(false);
        setChannelData(null);
      }
    } catch (error) {
      console.error('Error fetching user channel:', error);
      setHasChannel(false);
      setChannelData(null);
    } finally {
      setLoadingChannel(false);
    }
  };

  const fetchFavoriteChannels = async () => {
    try {
      if (!user || user?.sub === undefined) return;

      setLoadingFavorites(true);
      const favoriteChannels = await ChannelService.fetchFavoriteChannels(user.sub);
      console.log(favoriteChannels)
      setFavoriteChannels(favoriteChannels);    
    } catch (error) {
      console.error('Error fetching favorite channels:', error);
    } finally {
      setLoadingFavorites(false);
    }
  };

  const addChannelToFavorites = async (channelOwnerId: string) => {
    if (!user || user?.sub === undefined) return;
    try {
      const newFavorite = await ChannelService.addChannelToFavorites(user.sub, channelOwnerId);
      setFavoriteChannels((prevChannels) => [...prevChannels, newFavorite]);
    } catch (error) {
      console.error('Error adding channel to favorites:', error);
    }
  };

  const removeChannelFromFavorites = async (favoriteChannelId: string) => {
    try {
      await ChannelService.removeChannelFromFavorites(favoriteChannelId);
      setFavoriteChannels((prevChannels) =>
        prevChannels.filter((channel) => channel.id !== favoriteChannelId)
      );
    } catch (error) {
      console.error('Error removing channel from favorites:', error);
    }
  };

  const createChannel = async (channelData: channelInputProps) => {
    try {
      const newChannel = await createNewChannel({
        ...channelData,
        owner: user?.sub,
      });
      setChannelData(newChannel);
      setHasChannel(true);
    } catch (error) {
      console.error('Error creating channel:', error);
    }
  };

  const updateChannel = async (channelData: channleDataProps) => {
    try {
      await updateChannelDetails(channelData);
      setChannelData(channelData);
    } catch (error) {
      console.error('Error updating channel:', error);
      throw new Error('Failed to update channel');
    }
  };

  useEffect(() => {
    if (user) {
      fetchFavoriteChannels();
      checkUserChannel();
    }
  }, [user]);

  return (
    <ChannelContext.Provider
      value={{
        channelData,
        hasChannel,
        loadingChannel,
        favoriteChannels,
        loadingFavorites,
        updateChannel,
        createChannel,
        checkUserChannel,
        fetchFavoriteChannels,
        addChannelToFavorites,
        removeChannelFromFavorites,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

export const useChannel = () => {
  const context = useContext(ChannelContext);
  if (!context) {
    throw new Error('useChannel must be used within a ChannelProvider');
  }
  return context;
};

