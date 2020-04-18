import React from 'react';

import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import Contents from "./Contents/Contents";

import styles from './MainPage.module.css';


function MainPage(props) {
    return(
        <div className={styles.main_page}>
            <Header changeLoginStatus={props.changeLoginStatus}></Header>
            <Menu></Menu>
            <Contents></Contents>
        </div>
    );
}

export default MainPage;