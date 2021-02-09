import React from 'react';
import { ItemEntryScreen } from './ItemEntryScreen/ItemEntryScreen';
import './App.css';
import { RecoilRoot } from 'recoil';
import { Init } from './Init';

export const API_URL = process.env.REACT_APP_SERVER_URL;

function App() {
  console.log('REACT_APP_SERVER_URL', API_URL);
  return (
    <div className="App">
      <RecoilRoot>
        <Init />
        <ItemEntryScreen />
      </RecoilRoot>
    </div>
  );
}

export default App;
