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
    thumbnailUrl?: string;
    duration: number;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
};
  
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
  isForKids: boolean;
  isRestricted: boolean;
  playlist: string;
  scheduleTime: string;
  timezone: string;
  duration: number, 
  viewCount: number, 
  favoriteCount: number; 
  isPublic: boolean;
}