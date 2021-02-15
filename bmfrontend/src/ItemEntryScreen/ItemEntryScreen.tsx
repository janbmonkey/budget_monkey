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
import { DateTime } from 'luxon';
import { postItem } from '../Services/ItemService';

export const ItemEntryScreen: FC = () => {
  const defaultCurrency = useRecoilValue(rsDefaultCurrency);
  const currencyList = useRecoilValue(rsCurrencyList);
  const currentUserId = useRecoilValue(rsCurrentUserId);
  const userList = useRecoilValue(rsUserList);

  const [item, setItem] = useState<IItemType>({
    itemClass: '',
    price: {},
    currency: defaultCurrency,
    quantity: 1,
    date: DateTime.local(),
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

  const handleItemEntryInputChange = useCallback(
    (event) => {
      const { name, value } = event?.target;
      if (name && Object.keys(item).includes(name)) {
        setItem((prev: IItemType) => ({
          ...prev,
          [name]: name === 'date' ? DateTime.fromISO(value) : value,
        }));
      }
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

  const handleUserSelected = useCallback((selectedUser) => {
    if (selectedUser?.id && selectedUser?.name)
      setItem((prev) => ({ ...prev, buyer: selectedUser }));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      const doPostItem = async () => await postItem(item);
      doPostItem().then((response) => console.log('submited', response));
      setItem({
        itemClass: '',
        price: {},
        currency: defaultCurrency,
        quantity: 1,
        date: DateTime.local(),
        buyer: userList[currentUserId],
      } as IItemType);
      event.stopPropagation();
    },
    [currentUserId, defaultCurrency, item, userList]
  );

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

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            name="itemClass"
            type="text"
            ref={itemClassRef}
            placeholder="What did you get?"
            value={item.itemClass}
            onChange={handleItemEntryInputChange}
          />
        </Form.Group>
        <InputGroup>
          <FormControl
            id="inlineFormInputGroupPrice"
            name="price"
            type="number"
            placeholder="How much?"
            value={item.price}
            onChange={handleItemEntryInputChange}
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
              onChange={handleItemEntryInputChange}
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
              name="date"
              placeholder="Date"
              value={item.date.toISODate()}
              onChange={handleItemEntryInputChange}
            />
          </InputGroup>

          <InputGroup>
            <InputGroup.Text>Buyer</InputGroup.Text>
            <UserSelectDropdown
              activeUser={item.buyer}
              onSelectUser={handleUserSelected}
            />
          </InputGroup>
        </div>
        <Button className="btn-lg" onClick={handleSubmit}>
          <Icon.CheckCircle />
        </Button>
      </Form>
    </div>
  );
};
