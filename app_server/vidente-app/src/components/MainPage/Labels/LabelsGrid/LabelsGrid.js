import React, {useEffect, useState} from 'react';

import styles from './LabelsGrid.module.css';

import ReactPlaceholder from "react-placeholder";
import TextRow from "react-placeholder/lib/placeholders/TextRow";

import Barcode from "react-barcode";

const labelPlaceholder = (
    <div>
        <TextRow color='#E3E5E8' style={{width: 200, height: 20, borderRadius: 5}}/>
        <TextRow color='#E3E5E8' style={{width: 200, height: 20, borderRadius: 5}}/>
        <TextRow color='#E3E5E8' style={{width: 200, height: 20, borderRadius: 5}}/>
        <TextRow color='#E3E5E8' style={{width: 200, height: 20, borderRadius: 5}}/>
        <TextRow color='#E3E5E8' style={{width: 200, height: 20, borderRadius: 5}}/>
    </div>
);

function LabelsGrid(props) {
    let labelOptions = {
        format: "CODE39",
        lineColor: "black",
        width: 2, height: 100,
        font: "Helvetica",
        displayValue: true,
        textPosition: "bottom"
    };

    return (
        <>
            <div className={styles.contents_grid}>
                <ReactPlaceholder ready={props.currentGroup != undefined} customPlaceholder={labelPlaceholder} showLoadingAnimation={true}>
                    {props.labels.length > 0 ? (
                            props.labels.map((group, i) => (
                                <div className={styles.card} style={{background: "white"}} onClick={() => {
                                    props.handleCard("editLabel");
                                }}>
                                    <b>{group.name}</b>
                                    <Barcode text={group.sku} value={group.name} {...labelOptions}/>
                                </div>
                            ))
                        )
                        :
                        (
                        <div className={styles.add_label_card} id="add-label" onClick={() => {
                            props.handleCard("");
                        }}>
                            <span className={`no-select ${styles.no_select}`} >+ Add Label</span>
                        </div>
                        )
                    }
                </ReactPlaceholder>
            </div>
            
        </>
    );

}

export default LabelsGrid;