// src/components/ProfileEdit.tsx
import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { uploadAvatar, getAvatarUrl } from '../services/avatarService';
import { updateProfile } from '../services/profileService';
import styles from '../styles/ProfileEdit.module.css';
import { message } from 'antd';

const ProfileEdit: React.FC = () => {
  const [nickname, setNickname] = useState<string>('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarURL, setAvatarURL] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setNickname(user?.attributes?.nickname || '');
        const avatarKey = `avatars/${user.attributes.sub}.png`;
        const url = await getAvatarUrl(avatarKey);
        setAvatarURL(url);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('You are not authenticated. Please log in.');
      }
    };

    fetchUserData();
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setAvatar(file);
      setAvatarURL(URL.createObjectURL(file));
    } else {
      setError('Please select a valid image file');
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');

    try {
      const user = await Auth.currentAuthenticatedUser();
      await updateProfile({ 'nickname': nickname });

      if (avatar) {
        const avatarKey = `avatars/${user.attributes.sub}.png`;
        await uploadAvatar(avatarKey, avatar);
      }

      message.success('Profile updated successfully');
    } catch (err) {
      setError('Error updating profile. Please try again.');
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-gray-300 mt-80'>
      <div className={styles.profileEdit}>
        <h2>Edit Profile</h2>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.field}>
          <label>display name: </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Enter new display name"
          />
        </div>
        <div className={styles.field}>
          <label>Avatar:</label>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
          {avatarURL && <img src={avatarURL} alt="Avatar preview" width="100" />}
        </div>
        <button onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        </div>
      </div>
  );
};

export default ProfileEdit;
