import React from 'react';
import Avatar from '../../../components/Avatar';
import { useUser } from '../../../contexts/UserContext';

export type channelProps = {
  
}

export type FavoriteChannelListProps = {
  channelList: channelProps[]
}

const FavoriteChannelList: React.FC<FavoriteChannelListProps> = ({channelList}) => {
    const { user } = useUser();
  return (
    <div className="user-list grid grid-cols-1 md:grid-cols-2 gap-12">
        {channelList.map((item, index) => (
          <Avatar
            key={index}
            src={user?.profileAvatar} 
            name={''}
        />
        ))}
    </div>
  );
};

export default FavoriteChannelList;
