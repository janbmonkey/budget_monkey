import React from 'react';
import UserFormComponent from './UserFormComponent';
import UserListComponent from './UserListComponent';

function UserSection() {
  return (
    <>
      <UserListComponent/>
      <UserFormComponent/>
    </>
  );
};

export default UserSection;