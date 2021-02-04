export interface IUserType {
  id: string;
  name: string;
  email: string;
}

export interface IItemType {
  id: number;
  itemClass: string;
  price: number;
  currency: string;
  quantity: number;
  buyer: IUserType;
}
