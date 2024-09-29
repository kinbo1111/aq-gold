export interface UserAttributes {
  sub: string;
  email: string;
  nickname?: string;
  [key: string]: string | undefined;
}

export type VideoProps = {
    id: string;
    title: string;
    description?: string;
    videoUrl: string;
    vThumbnailUrl: string;
    thumbnailUrl?: string;
    duration: number;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
};
  
export type VideoData = {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  category?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  vThumbnailUrl?: string;
  isForKids: boolean;
  isRestricted: boolean;
  playlist: string;
  scheduleTime: string;
  timezone: string;
  channelId: string;
  owner: string;
  duration: number, 
  viewCount: number, 
  favoriteCount: number; 
  isPublic: boolean;
  createdAt: string;
}

export type VideoInputData =  {
  title: string;
  description?: string;
  tags?: string[];
  category?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  vThumbnailUrl?: string;
  isForKids: boolean;
  isRestricted: boolean;
  playlist: string;
  scheduleTime: string;
  timezone: string;
  duration: number, 
  viewCount: number, 
  channelId: string,
  favoriteCount: number; 
  isPublic: boolean;
}

export type FavoriteChannel = {
  id: string;
  channel: {
    avatarUrl: string;
    description: string;
  }
  channelId: string;
  owner: string;
  createdAt: string;
}

export type Channel = {
  id: string;
  name: string;
  description: string;
  owner: string;
  avatarUrl: string;
  subscribersCount: number;
  createdAt: string;
  updatedAt: string;
  videos: VideoData[];
  favoriteChannels: FavoriteChannel[];
}

export type channleDataProps = {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
  owner: string | undefined;
}

export type channelInputProps = {
  name: string;
  description: string;
  avatarUrl: string;
}

export type VideoUpdateData = {
  id: string; 
  title: string;
  description?: string;
  category?: string;
  thumbnailUrl?: string;
  vThumbnailUrl?: string;
  isForKids: boolean;
  isRestricted: boolean;
  playlist: string;
  channelId: string;  
};
