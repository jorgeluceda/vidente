import React from 'react';

import styles from './Contents.module.css';

import ContentsHeader from "./ContentsHeader/ContentsHeader";
import ContentsGrid from './ContentsGrid/ContentsGrid';

function Contents() {
    return(
        <>
            <ContentsHeader></ContentsHeader>
            <ContentsGrid></ContentsGrid>
        </>
    );

}

export default Contents;