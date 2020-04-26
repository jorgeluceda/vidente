import React from 'react';

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
        lineColor: "black",
        width: 2, height: 100,
        font: "Helvetica",
        displayValue: true,
        textPosition: "bottom"
    };

    let labels = [];

    if(props.labels != undefined) {
        props.labels.map((label, i) => (
            labels.push(
                <div className={styles.card} style={{background: "white"}} value={i} key={i} onClick={() => {
                    props.handleCard("editLabel", i);
                }}>
                    <b>{label.name}</b>
                    <Barcode text={label.sku} value={label.sku} format={label.type} {...labelOptions}/>
                </div>
            )
        ))
    }
    return (
        <>
            <div className={styles.contents_grid}>
                <ReactPlaceholder ready={props.labelsLoaded} customPlaceholder={labelPlaceholder} showLoadingAnimation={true}>
                    {labels.length > 0 ? (
                        <>
                            {labels}
                        </>

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