import { API_URL } from "./App";
import { UserModel } from "./UserModel";

export const getUser = async (id: number) => {
  const response = await fetch(`${API_URL}/user/${id}`)
  const body = await response.json();
  return body as UserModel;
};

export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/user`)
  const body = await response.json();
  return body as UserModel[];
};

export const postUsers = async (user: UserModel) => {
  const response = await fetch(`${API_URL}/user`,{
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
        'Content-Type': 'application/json'
    },
  });
  const body = await response.json();
  return body;
};