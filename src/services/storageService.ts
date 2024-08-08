// src/services/storageService.ts
import { Storage } from 'aws-amplify';

export const uploadAvatar = async (key: string, file: File): Promise<void> => {
  try {
    await Storage.put(key, file, {
      contentType: file.type
      // level: 'public',
    });
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
};

export const getAvatarUrl = async (key: string): Promise<string> => {
  try {
    return await Storage.get(key, { level: 'public' });
  } catch (error) {
    console.error('Error getting avatar URL:', error);
    throw error;
  }
};
