import React from 'react';

import Header from '../header/header';
import MenuHeader from "../menu-header/MenuHeader";
import Menu from "../menu/Menu";
import './App.css';



function App() {
  return (
    <div className="grid-page">
      <Header/>
      <MenuHeader/>
      <Menu/>
    </div>

  );
}

export default App;
