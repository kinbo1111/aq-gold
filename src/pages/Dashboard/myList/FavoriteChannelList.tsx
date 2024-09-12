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
        {favoriteChannels.map((item, index) => (
          <Avatar
            key={index}
            src={item.channelOwner.avatarUrl} 
            name={item.channelOwner.name}
        />
        ))}
    </div>
  );
};

export default FavoriteChannelList;
