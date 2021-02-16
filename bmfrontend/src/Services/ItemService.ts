import { DateTime } from 'luxon';
import { API_URL } from '../App';
import { IItemType } from '../App.types';

const toDto = (item: IItemType): any => ({
  ...item,
  purchaseDate: item.purchaseDate.toUTC().toISO({ includeOffset: true }),
});

const fromDto = (itemDto: any): IItemType =>
  ({
    ...itemDto,
    purchaseDate: DateTime.fromISO(itemDto.purchaseDate, {
      zone: 'UTC',
      setZone: true,
    }).toLocal(),
  } as IItemType);

export const getItem = async (id: string) => {
  const response = await fetch(`${API_URL}/item/${id}`);
  const body = await response.json();
  return fromDto(body);
};

export const getAllItems = async () => {
  const response = await fetch(`${API_URL}/item`);
  const body = (await response.json()) as any[];
  console.trace('get all items', 'response', body);
  return body.map((itemDto) => fromDto(itemDto));
};

export const getAllItemsAsRecord = async () => {
  const itemList = await getAllItems();
  const itemRecord: Record<string, IItemType> = {};
  itemList.forEach((item) => (itemRecord[item.id] = item));
  return itemRecord;
};

export const postItem = async (item: IItemType) => {
  debugger;
  const postBody = JSON.stringify(toDto(item));
  const response = await fetch(`${API_URL}/item`, {
    method: 'POST',
    body: postBody,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const body = await response.json();
  console.trace(`POST ${API_URL}/item`, postBody, 'response', body);
  return body;
};

export const deleteItem = async (item: IItemType) => {
  const response = await fetch(`${API_URL}/item/${item.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const body = await response.json();
  console.trace('deleted item', item, body?.deleted);
  return;
};
