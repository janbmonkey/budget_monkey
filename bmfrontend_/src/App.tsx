import React from 'react';
import UserSection from './UserSection';

export const API_URL = process.env.REACT_APP_SERVER_URL;

function App() {
  console.log('REACT_APP_SERVER_URL', API_URL);
  return (
  <>
    <UserSection/>
  </>
  )
}

export default App;
