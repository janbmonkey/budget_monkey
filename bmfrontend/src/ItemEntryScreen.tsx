import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  rsDefaultCurrency,
  rsCurrencyList,
  rsCurrentUserId,
  rsUserList,
} from './App.recoil';
import { IItemType, IUserType } from './App.types';
import * as Icon from 'react-bootstrap-icons';
import { postUsers } from './UserService';

export const ItemEntryScreen: FC = (props) => {
  const defaultCurrency = useRecoilValue(rsDefaultCurrency);
  const currencyList = useRecoilValue(rsCurrencyList);
  const currentUserId = useRecoilValue(rsCurrentUserId);
  const [userList, setUserList] = useRecoilState(rsUserList);
  const [item, setItem] = useState<IItemType>({
    itemClass: '',
    currency: defaultCurrency,
    quantity: 1,
    buyer: userList[currentUserId],
  } as IItemType);

  useEffect(() => {
    setItem((prev) => ({
      ...prev,
      itemClass: '',
      currency: defaultCurrency,
      quantity: 1,
      buyer: userList[currentUserId],
    }));
  }, [defaultCurrency, currentUserId, userList]);

  const onChangeItemEntryInput = useCallback(
    (event) => {
      console.log('event', event);

      const { name, value } = event?.target;
      if (name && Object.keys(item).includes(name))
        setItem((prev: IItemType) => ({
          ...prev,
          [name]: value,
        }));
    },
    [item]
  );

  const onSelectCurrency = useCallback(
    (selectedCurrency) => {
      if (selectedCurrency && currencyList.includes(selectedCurrency))
        setItem((prev) => ({ ...prev, currency: selectedCurrency }));
    },
    [currencyList]
  );
  const onSelectUser = useCallback(
    (selectedUserId) => {
      if (selectedUserId) {
        const selectedUser = userList[selectedUserId];
        if (selectedUser?.id && selectedUser?.name)
          setItem((prev) => ({ ...prev, buyer: selectedUser }));
      }
    },
    [userList]
  );

  const [newUser, setNewUser] = useState<IUserType>({
    name: '',
    email: '',
  } as IUserType);

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
    <div>
      <h1>
        <Icon.BagPlus />
      </h1>

      <Form onSubmit={(event) => event.stopPropagation()}>
        <Form.Group>
          <Form.Control
            name="itemClass"
            type="text"
            placeholder="What did you get?"
            value={item.itemClass}
            onChange={onChangeItemEntryInput}
          />
        </Form.Group>
        <InputGroup>
          <FormControl
            id="inlineFormInputGroupPrice"
            name="price"
            type="number"
            placeholder="How much?"
            value={item.price}
            onChange={onChangeItemEntryInput}
          />
          <DropdownButton
            as={InputGroup.Append}
            title={item.currency}
            id="dropdown-currency"
            onSelect={onSelectCurrency}
          >
            {currencyList.map((c) => (
              <Dropdown.Item
                key={c}
                eventKey={c}
                active={c === item.currency ? true : false}
              >
                {c}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </InputGroup>
        <hr />
        <div>
          <InputGroup>
            {/* <Icon.FileExcelFill className="ml-4" /> */}
            <InputGroup.Text>Quantity</InputGroup.Text>
            <FormControl
              name="quantity"
              type="number"
              prefix="asfdf"
              value={item.quantity}
              onChange={onChangeItemEntryInput}
            />
            <InputGroup.Append>
              <InputGroup.Text>x</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </div>

        <InputGroup>
          <InputGroup.Text>Buyer</InputGroup.Text>
          <DropdownButton
            title={item.buyer ? item.buyer.name : 'Who bought it?'}
            id="dropdown-user"
            onSelect={onSelectUser}
          >
            {Object.values(userList)
              .filter((user) => user)
              .map((user) => (
                <Dropdown.Item
                  className="d-flex justify-content-between"
                  key={user.id}
                  eventKey={String(user.id)}
                  active={user.id === item.buyer?.id ? true : false}
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
        </InputGroup>
      </Form>
    </div>
  );
};
