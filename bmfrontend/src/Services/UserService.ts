import { API_URL } from '../App';
import { IUserType } from '../App.types';

export const getUser = async (id: string) => {
  const response = await fetch(`${API_URL}/user/${id}`);
  const body = await response.json();
  return body as IUserType;
};

export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/user`);
  const body = (await response.json()) as IUserType[];

  return body as IUserType[];
};

export const getAllUsersAsRecord = async () => {
  const userList = await getAllUsers();
  const userRecord: Record<string, IUserType> = {};
  userList.forEach((user) => (userRecord[user.id] = user));
  return userRecord;
};

export const postUser = async (user: IUserType) => {
  const response = await fetch(`${API_URL}/user`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const body = await response.json();
  console.trace('posted user', user, 'response', body);
  return body;
};

export const deleteUser = async (user: IUserType) => {
  const response = await fetch(`${API_URL}/user/${user.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const body = await response.json();
  console.trace('deleted user', user, body?.deleted);
  return;
};
