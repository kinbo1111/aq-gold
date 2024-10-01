import React from 'react';
import Avatar from '../../../components/Avatar';
import { UserListData } from '../../../utils/content';
import { useUser } from '../../../contexts/UserContext';

const UserList = () => {
  const { user } = useUser();
  return (
    <div className="user-list grid grid-cols-1 md:grid-cols-2 gap-12">
        {UserListData.map((item, index) => (
          <Avatar
            key={index}
            src={user?.profileAvatar} 
            name={item.name}
        />
        ))}
    </div>
  );
};

export default UserList;
