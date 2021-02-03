import React from 'react';
import { ItemEntryScreen } from './ItemEntryScreen';
import UserSection from './UserSection';
import './App.css';

export const API_URL = process.env.REACT_APP_SERVER_URL;

function App() {
  console.log('REACT_APP_SERVER_URL', API_URL);
  return (
    <div className="App">
      <ItemEntryScreen />
      <UserSection />
    </div>
  );
}

export default App;
