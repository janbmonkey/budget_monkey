import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { IItemType } from '../App.types';
import * as Icon from 'react-bootstrap-icons';
import './ItemEntryScreen.css';
import {
  rsDefaultCurrency,
  rsCurrencyList,
  rsCurrentUserId,
  rsUserList,
} from '../App.recoil';
import { UserSelectDropdown } from './UserSelectDropdown';

export const ItemEntryScreen: FC = (props) => {
  const defaultCurrency = useRecoilValue(rsDefaultCurrency);
  const currencyList = useRecoilValue(rsCurrencyList);
  const currentUserId = useRecoilValue(rsCurrentUserId);
  const userList = useRecoilValue(rsUserList);
  const [item, setItem] = useState<IItemType>({
    itemClass: '',
    currency: defaultCurrency,
    quantity: 1,
    buyer: userList[currentUserId],
  } as IItemType);
  const current = new Date();
  const [date, setDate] = useState(
    `${current.getFullYear()}-${String(current.getMonth()).padStart(
      2,
      '0'
    )}-${String(current.getDate()).padStart(2, '0')}`
  );

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

  const onSelectUser = useCallback((selectedUser) => {
    if (selectedUser?.id && selectedUser?.name)
      setItem((prev) => ({ ...prev, buyer: selectedUser }));
  }, []);

  // Set Focus
  const itemClassRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    itemClassRef.current?.focus();
  }, []);

  return (
    <div>
      <h1>
        got
        <Icon.CartPlus className="my-animation" />
        stuff
      </h1>

      <Form onSubmit={(event) => event.stopPropagation()}>
        <Form.Group>
          <Form.Control
            name="itemClass"
            type="text"
            ref={itemClassRef}
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
            <InputGroup.Text>Quantity</InputGroup.Text>
            <FormControl
              name="quantity"
              type="number"
              prefix="asfdf"
              value={item.quantity}
              onChange={onChangeItemEntryInput}
            />
            <InputGroup.Append>
              <InputGroup.Text>
                <Icon.Collection />
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>

          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Date</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="date"
              name="dob"
              placeholder="Date"
              value={date}
              onChange={(event) => {
                console.log(event.target.value);
                setDate(event.target.value);
              }}
            />
          </InputGroup>

          <InputGroup>
            <InputGroup.Text>Buyer</InputGroup.Text>
            <UserSelectDropdown
              activeUser={item.buyer}
              onSelectUser={onSelectUser}
            />
          </InputGroup>
        </div>
        <Button className="btn-lg">
          <Icon.CheckCircle />
        </Button>
      </Form>
    </div>
  );
};
