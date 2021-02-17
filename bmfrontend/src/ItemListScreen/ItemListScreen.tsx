import React, { FC, useCallback, useEffect, useState } from 'react';
import { CloseButton, ListGroup } from 'react-bootstrap';
import { IItemType } from '../App.types';
import { getCurrencySign } from '../Services/CurrencyService';
import { deleteItem, getAllItemsAsRecord } from '../Services/ItemService';

export const ItemListScreen: FC = () => {
  const [itemList, setItemList] = useState<Record<string, IItemType>>({});

  useEffect(() => {
    const fetchData = async () => {
      const items = await getAllItemsAsRecord();
      setItemList(items);
    };
    fetchData();
  }, []);

  const handleDelete = useCallback(
    (item) => {
      console.log(item);
      deleteItem(item);
      setItemList((prev) => {
        const modifiable = JSON.parse(JSON.stringify(prev));
        delete modifiable[item.id];
        return { ...modifiable };
      });
    },
    [setItemList]
  );

  return (
    <div>
      <ListGroup className="xs" variant="flush">
        {Object.entries(itemList).map(([key, item]) => (
          <ListGroup horizontal="sm" className="my-2" key={key}>
            <ListGroup.Item action className="xs col-4">
              {item.itemClass}
            </ListGroup.Item>
            <ListGroup.Item action className="col-3">
              {item.price + ' ' + getCurrencySign(item.currency)}
            </ListGroup.Item>
            <ListGroup.Item action className="col-3">
              {item?.buyer?.name ? <div>@{item.buyer.name}</div> : ' '}
            </ListGroup.Item>
            <ListGroup.Item action className="col-3">
              {item?.purchaseDate?.isValid ? (
                <div>{item.purchaseDate.toLocaleString()}</div>
              ) : (
                ' '
              )}
            </ListGroup.Item>

            <ListGroup.Item action onClick={() => handleDelete(item)}>
              <CloseButton />
            </ListGroup.Item>
          </ListGroup>
        ))}
      </ListGroup>
    </div>
  );
};
