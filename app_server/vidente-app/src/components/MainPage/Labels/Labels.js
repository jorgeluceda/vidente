import React from 'react';

import styles from './Labels.module.css';

import LabelsHeader from "./LabelsHeader/LabelsHeader";
import LabelsGrid from './LabelsGrid/LabelsGrid';

function Labels() {
    return(
        <>
            <LabelsHeader></LabelsHeader>
            <LabelsGrid></LabelsGrid>
        </>
    );

}

export default Labels;