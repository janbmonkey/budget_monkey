import React, { useEffect, useState } from 'react';
import UserItem from './UserItem';
import { UserModel } from './UserModel';
import { getAllUsers } from './UserService';

function UserListComponent() {
  
  const [userList, setUserList] = useState<UserModel[]>();
  
  useEffect( () => {
    const fetchData = async () => {
      const users = await getAllUsers();
      setUserList(users);
    }
    fetchData();
  }, [userList]);

  return (
    <div>
      { userList?.map( user => <UserItem user={user}/>) }
    </div>
  );
};

export default UserListComponent;