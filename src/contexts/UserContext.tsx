import React, { createContext, useState, useEffect, ReactNode, useContext, useCallback } from 'react';
import { Auth } from 'aws-amplify';
import { message } from 'antd';
import { getChannelAvatarUrl, getProfileAvatarUrl } from '../services/storageService';
import { getContinueWatchingVideos } from '../services/UserActivityService';
import { VideoData, FavoriteChannel } from '../types';

export type CustomUser = {
  username: string;
  email?: string;
  profileAvatar?: string;
  sub?: string;
  nickname?: string | undefined;
  channelAvatar?: string;
  channelName?: string | undefined;
  channelHandle?: string | undefined;
  [key: string]: any;
}

export type UserContextType = {
  user: CustomUser | null;
  setUser: (user: CustomUser | null) => void;
  loading: boolean;
  isAuthenticated: boolean;
  isModalVisible: boolean;
  continueVideos: VideoData[];
  login: () => void;
  logout: () => void;
  setUnAuth: () => void;
  ModalUnvisible: () => void;
  updateEmail: (newEmail: string) => Promise<void>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  updateNickname: (newNickname: string) => Promise<void>;
  updateChannelName: (channelName: string) => Promise<void>;
  updateChannelHandle: (channelHandle: string) => Promise<void>;
  updateUserData: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export type UserProviderProps = {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [continueVideos, setContinueVideos] = useState<VideoData[]>([]);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const currentUser = await Auth.currentAuthenticatedUser();
      const avatarKey = await `avatar/profile/${currentUser.attributes.sub}.png`;
      const profileUrl = await getProfileAvatarUrl(avatarKey);
      const channelKey = await `avatar/channel/${currentUser.attributes.sub}.png`;
      const channelUrl = await getChannelAvatarUrl(channelKey);
    
      const customUser: CustomUser =  await {
        username: currentUser.username,
        email: currentUser.attributes.email,
        channelHandle: currentUser['custom:channelHandle'] || null,
        channelName: currentUser['custom?.channelName'] || null,
        sub: currentUser.attributes.sub,
        nickname: currentUser.attributes.nickname,
        profileAvatar: profileUrl,
        channelAvatar: channelUrl,
        favoriteCount: currentUser.favoriteCount
      };

      await setUser(customUser);
      await setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchContinue = async () => {
    try {
      if (user?.sub === undefined) return;
      const continueVideos = await getContinueWatchingVideos(user?.sub);
      setContinueVideos(continueVideos.map((v) => v.video))
    } catch (error) {
      console.error('failed');
    }

  }

  useEffect(() => {
    fetchUser();
    fetchContinue()
  }, [fetchUser]);

  const login = async () => {
    try {
      setIsAuthenticated(true);
      await fetchUser();
      message.success('Login successful');
    } catch (error) {
      message.error('Login failed');
    }
  };

  const logout = async () => {
    try {
      await Auth.signOut();
      setUser(null);
      message.success("log out successfully!")
      setIsAuthenticated(false);
    } catch (error) {
      message.error('Logout failed');
    }
  };
  
const setUnAuth = async () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed');
    }
  };

  const ModalUnvisible = async () => {
     try {
      setIsModalVisible(false);
    } catch (error) {
      console.error('failed');
    }
  }

  const updateEmail = async (newEmail: string) => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      if (!currentUser) throw new Error('No user is logged in');
      await Auth.updateUserAttributes(currentUser, { email: newEmail });
      await fetchUser();
      setIsModalVisible(true);
      message.success('Email updated successfully. Please verify the new email.');
    } catch (error) {
      message.error(`Error updating email: ${(error as Error).message}`);
    }
  };

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const result = await Auth.changePassword(currentUser, oldPassword, newPassword);
      await fetchUser();
      message.success('Password changed successfully.');
    } catch (error) {
      message.error(`Error changing password: ${(error as Error).message}`);
    }
  };

  const updateNickname = async (newNickname: string) => {
    try {
      if (!user) throw new Error('No user is logged in');
      await Auth.updateUserAttributes(user, { nickname: newNickname });
      await fetchUser();
      message.success('Nickname updated successfully.');
    } catch (error) {
      message.error(`Error updating nickname: ${(error as Error).message}`);
    }
  };

  const updateChannelHandle = async (channelHandle: string) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (!user) throw new Error('No user is logged in');
      await Auth.updateUserAttributes(user, { 'custom:channelHandle': channelHandle });
      await fetchUser();
      message.success('Channel handle updated successfully.');
    } catch (error) {
      message.error(`Error updating handle: ${(error as Error).message}`);
    }
  };

  const updateChannelName = async (channelName: string) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (!user) throw new Error('No user is logged in');
      await Auth.updateUserAttributes(user, { 'custom:channelName': channelName });
      await fetchUser();
      message.success('Channel name updated successfully.');
    } catch (error) {
      message.error(`Error updating channel name: ${(error as Error).message}`);
    }
  };

  const updateUserData = () => fetchUser();
  
  return (
    <UserContext.Provider value={{ user, setUser, loading, isAuthenticated, isModalVisible, continueVideos, login, setUnAuth, logout, updateEmail, updatePassword, updateNickname, updateUserData, ModalUnvisible, updateChannelHandle, updateChannelName}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
