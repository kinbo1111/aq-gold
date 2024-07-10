import React from 'react';
import Avatar from '../../../components/Avatar';
import { UserListData } from '../../../utils/content';

const UserList = () => {
  return (
    <div className="user-list grid grid-cols-1 md:grid-cols-2 gap-12">
        {UserListData.map((item, index) => (
        <Avatar
            name={item.name}
        />
        ))}
    </div>
  );
};

export default UserList;
