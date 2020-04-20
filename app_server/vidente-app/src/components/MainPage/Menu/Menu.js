import React from 'react';

import styles from './Menu.module.css';

import MenuHeader from "./MenuHeader/MenuHeader";
import MenuContents from "./MenuContents/MenuContents";

function Menu(props) {
    return(
        <>
            <MenuHeader></MenuHeader>
            <MenuContents groups={props.groups}></MenuContents>
        </>
    );

}

export default Menu;