import React from 'react';
import styles from './App.module.css';

import Header from '../Header/Header';
import Menu from "../Menu/Menu";

import Footer from '../Footer/Footer';
import Contents from '../Contents/Contents';

function App() {
  return (
    <div className={styles.app}>
      <Header></Header>
      <Menu></Menu>
      <Contents></Contents>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
