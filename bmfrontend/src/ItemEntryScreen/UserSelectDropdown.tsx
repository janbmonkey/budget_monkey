import React, { FC, useCallback, useState } from 'react';
import {
  Button,
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { rsUserList } from '../App.recoil';
import { IUserType } from '../App.types';
import { postUsers } from '../UserService';
import * as Icon from 'react-bootstrap-icons';

export interface IUserSelectDropdownProps {
  activeUser: IUserType;
  onSelectUser: (user: IUserType) => void;
}

export const UserSelectDropdown: FC<IUserSelectDropdownProps> = (props) => {
  const { onSelectUser, activeUser } = props;
  const [userList, setUserList] = useRecoilState(rsUserList);
  const [newUser, setNewUser] = useState<IUserType>({
    name: '',
    email: '',
  } as IUserType);

  const _onSelectUser = useCallback(
    (selectedUserId) => {
      if (selectedUserId) {
        const selectedUser = userList[selectedUserId];
        if (selectedUser?.id && selectedUser?.name) onSelectUser(selectedUser);
      }
    },
    [onSelectUser, userList]
  );

  const onChangeNewUserInput = useCallback(
    (event) => {
      const { name, value } = event?.target;
      if (name && Object.keys(newUser).includes(name))
        setNewUser((prev) => ({ ...prev, [name]: value }));
    },
    [newUser]
  );

  const onCreateNewUser = useCallback(() => {
    console.log('newUser', newUser);
    if (newUser.name) {
      const putData = async () => await postUsers(newUser);
      const newId = putData();
      setNewUser({ name: '', email: '' } as IUserType);
      newId.then((id) => {
        const pushedUser = { ...newUser, id };
        setUserList((prev) => ({ ...prev, [id]: pushedUser }));
      });
    }
  }, [newUser, setUserList]);
  return (
    <DropdownButton
      title={activeUser ? activeUser.name : 'Who bought it?'}
      id="dropdown-user"
      onSelect={_onSelectUser}
    >
      {Object.values(userList)
        .filter((user) => user)
        .map((user) => (
          <Dropdown.Item
            className="d-flex justify-content-between"
            key={user.id}
            eventKey={String(user.id)}
            active={user.id === activeUser?.id ? true : false}
          >
            <div>{user.name}</div>
            <div className="text-muted">{user.email}</div>
          </Dropdown.Item>
        ))}
      <Dropdown.Divider> New User </Dropdown.Divider>
      {/* Add new User */}
      <div className="d-flex justify-content-between">
        <InputGroup className="input-group-sm">
          <FormControl
            name="name"
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={onChangeNewUserInput}
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
              event.key === 'Enter' && onCreateNewUser()
            }
          />
          <FormControl
            name="email"
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={onChangeNewUserInput}
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
              event.key === 'Enter' && onCreateNewUser()
            }
          />
        </InputGroup>
        <Button className="btn-sm" onClick={onCreateNewUser}>
          <Icon.PersonPlusFill />
        </Button>
      </div>
    </DropdownButton>
  );
};
