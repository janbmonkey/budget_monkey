import React, { FC } from 'react';
import { UserModel } from './UserModel';

export interface UserItemProps{
  user: UserModel,
}

const UserItem: FC<UserItemProps> = (props) => {
  const { user } = props;
  
  return (
    <>
    <span> {user.id} {user.name} {user.email} </span> <br/>
    </>
  );
}
export default UserItem;