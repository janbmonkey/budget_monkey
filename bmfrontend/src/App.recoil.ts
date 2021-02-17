import { atom } from 'recoil';
import { IItemType, IUserType, NaviationType } from './App.types';

export const rsNavigation = atom<NaviationType>({
  key: 'rsNavigation',
  default: NaviationType.ITEM_ENTRY,
});

export const rsDefaultCurrency = atom<string>({
  key: 'rsDefaultCurrency',
  default: '',
});

export const rsCurrencyList = atom<string[]>({
  key: 'rsCurrencyList',
  default: [],
});

export const rsCurrentUserId = atom<string>({
  key: 'rsCurrentUserId',
  default: '',
});

export const rsUserList = atom<Record<string, IUserType>>({
  key: 'rsUserList',
  default: {},
});

export const rsItemList = atom<Record<string, IItemType>>({
  key: 'rsItemList',
  default: {},
});
