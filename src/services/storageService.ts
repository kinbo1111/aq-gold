import { Storage } from 'aws-amplify';
import { cloudFrontDomain } from '../const';

export async function uploadVideo(file: File): Promise<string> {
  try {
    const result = await Storage.put(`videos/${file.name}`, file, {
      contentType: file.type,
    });
    return result.key;
  } catch (error) {
    console.error('Error uploading video', error);
    throw new Error('Failed to upload video. Please try again.');
  }
}

export async function getVideoUrl(key: string): Promise<string> {
  try {
      return `${cloudFrontDomain}/${key}`;
  } catch (error) {
    console.error('Error getting video URL', error);
    throw new Error('Failed to retrieve video URL.');
  }
}

export async function uploadThumbnail(file: File): Promise<string> {
  try {
    const result = await Storage.put(`vThumbnails/${file.name}`, file, {
      contentType: file.type,
    });
    return result.key;
  } catch (error) {
    console.error('Error uploading thumbnail', error);
    throw new Error('Failed to upload thumbnail. Please try again.');
  }
}

export async function uploadVthumbnail(file: File): Promise<string> {
  try {
    const result = await Storage.put(`thumbnails/${file.name}`, file, {
      contentType: file.type,
    });
    return result.key;
  } catch (error) {
    console.error('Error uploading vertical thumbnail', error);
    throw new Error('Failed to upload vertical thumbnail. Please try again.');
  }
}

export async function getThumbnailUrl(key: string): Promise<string> {
  try {
    return `${cloudFrontDomain}/${key}`;
  } catch (error) {
    console.error('Error getting thumbnail URL', error);
    throw new Error('Failed to retrieve thumbnail URL.');
  }
}


export async function uploadProfileAvatar(fileName: string, file: File): Promise<string> {
  try {
    const result = await Storage.put(`avatar/profile/${fileName}`, file, {
      contentType: file.type,
       cacheControl: 'no-cache, no-store, must-revalidate'
    });
    return result.key;
  } catch (error) {
    console.error('Error uploading avatar', error);
    throw new Error('Failed to upload avatar. Please try again.');
  }
}


export async function getProfileAvatarUrl(key: string): Promise<string> {
  try {
    return `${cloudFrontDomain}/${key}`;
  } catch (error) {
    console.error('Error getting profile avatar URL', error);
    throw new Error('Failed to retrieve profile avatar URL.');
  }
}

export async function uploadChannelAvatar(fileName: string, file: File): Promise<string> {
  try {
    const result = await Storage.put(`avatar/channel/${fileName}`, file, {
      contentType: file.type,
       cacheControl: 'no-cache, no-store, must-revalidate'
    });
    return result.key;
  } catch (error) {
    console.error('Error uploading avatar', error);
    throw new Error('Failed to upload avatar. Please try again.');
  }
}

export async function getChannelAvatarUrl(key: string): Promise<string> {
  try {
    return `${cloudFrontDomain}/${key}`;
  } catch (error) {
    console.error('Error getting profile avatar URL', error);
    throw new Error('Failed to retrieve profile avatar URL.');
  }
}



