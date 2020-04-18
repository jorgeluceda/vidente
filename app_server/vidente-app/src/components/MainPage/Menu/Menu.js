import React from 'react';

import styles from './Menu.module.css';

import MenuHeader from "./MenuHeader/MenuHeader";
import MenuContents from "./MenuContents/MenuContents";

function Menu() {
    return(
        <>
            <MenuHeader></MenuHeader>
            <MenuContents></MenuContents>
        </>
    );

}

export default Menu;