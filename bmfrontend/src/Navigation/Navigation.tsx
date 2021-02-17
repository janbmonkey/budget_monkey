import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { rsNavigation } from '../App.recoil';
import { NaviationType } from '../App.types';
import { ItemEntryScreen } from '../ItemEntryScreen/ItemEntryScreen';
import { ItemListScreen } from '../ItemListScreen/ItemListScreen';

export const Navigation: FC = () => {
  const [navigation, setNavigation] = useRecoilState(rsNavigation);
  return (
    <div>
      <Button onClick={() => setNavigation(NaviationType.ITEM_ENTRY)}>
        Item Entry
      </Button>
      <Button onClick={() => setNavigation(NaviationType.ITEM_LIST)}>
        All Stuff
      </Button>

      {navigation === NaviationType.ITEM_ENTRY && <ItemEntryScreen />}
      {navigation === NaviationType.ITEM_LIST && <ItemListScreen />}
    </div>
  );
};
