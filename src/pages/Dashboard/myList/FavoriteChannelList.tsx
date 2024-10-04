import React, { useEffect } from 'react';
import Avatar from '../../../components/Avatar';
import { useUser } from '../../../contexts/UserContext';
import { useChannel } from '../../../contexts/ChannelContext';

const FavoriteChannelList = () => {
  
  const { favoriteChannels, loadingFavorites, fetchFavoriteChannels } = useChannel();

  useEffect(() => {
        fetchFavoriteChannels();
  }, []);

  if (loadingFavorites) return <div className='text-white'>Loading favorite channels...</div>;
  
  return (
    <div className="user-list grid grid-cols-1 md:grid-cols-2 gap-12">
      {favoriteChannels.map((channel, index) => (
          <Avatar
            key={index}
            src={channel?.channel?.avatarUrl} 
            name={channel?.owner}
        />
        ))}
    </div>
  );
};

export default FavoriteChannelList;
