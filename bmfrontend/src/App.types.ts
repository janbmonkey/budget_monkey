import { DateTime } from 'luxon';

export enum NaviationType {
  ITEM_ENTRY,
  ITEM_LIST,
}
export interface IUserType {
  id: number;
  name: string;
  email: string;
}

export interface IItemType {
  id: number;
  itemClass: string;
  price: number;
  currency: string;
  quantity: number;
  purchaseDate: DateTime;
  buyer: IUserType;
}
