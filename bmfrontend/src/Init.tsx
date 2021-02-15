import React, { FC, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  rsDefaultCurrency,
  rsCurrencyList,
  rsCurrentUserId,
  rsUserList,
} from './App.recoil';
import { getAllUsersAsRecord } from './Services/UserService';

export const Init: FC = () => {
  const setCurrentUserId = useSetRecoilState(rsCurrentUserId);
  const setCurrency = useSetRecoilState(rsDefaultCurrency);
  const setCurrencyList = useSetRecoilState(rsCurrencyList);
  const setUserList = useSetRecoilState(rsUserList);

  useEffect(() => {
    setCurrentUserId('22');
    setCurrency('EUR');
    setCurrencyList(['EUR', 'USD', 'YEN']);

    const fetchData = async () => {
      const users = await getAllUsersAsRecord();
      setUserList(users);
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};
