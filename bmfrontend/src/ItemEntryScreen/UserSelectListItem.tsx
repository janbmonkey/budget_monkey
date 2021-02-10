import React, { FC, useCallback } from 'react';
import { CloseButton, Dropdown } from 'react-bootstrap';
import { useSetRecoilState } from 'recoil';
import { rsUserList } from '../App.recoil';
import { IUserType } from '../App.types';
import { deleteUser } from '../UserService';

export interface IUserSelectListItemProps {
  user: IUserType;
  isActive: boolean;
}

export const UserSelectListItem: FC<IUserSelectListItemProps> = (props) => {
  const { user, isActive } = props;
  const setUserList = useSetRecoilState(rsUserList);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      deleteUser(user);
      setUserList((prev) => {
        const modifiable = JSON.parse(JSON.stringify(prev));
        delete modifiable[user.id];
        return { ...modifiable };
      });
      event.stopPropagation();
    },
    [setUserList, user]
  );

  return (
    <Dropdown.Item
      className="d-flex justify-content-between pr-2"
      key={user.id}
      eventKey={String(user.id)}
      active={isActive}
    >
      <div>{user.name}</div>
      <div className="text-muted">{user.email}</div>
      <CloseButton onClick={handleClick} />
    </Dropdown.Item>
  );
};
