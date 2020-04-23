import React from 'react';

import styles from './LabelsGrid.module.css';

import ReactPlaceholder from "react-placeholder";
import TextRow from "react-placeholder/lib/placeholders/TextRow";

import Barcode from "react-barcode";

const labelPlaceholder = (
    <div>
        {/*<RectShape color='blue' style={{width: 30, height: 80}}/>*/}
        <TextRow color='#E3E5E8' style={{width: 200, height: 20, borderRadius: 5}}/>
        <TextRow color='#E3E5E8' style={{width: 200, height: 20, borderRadius: 5}}/>
        <TextRow color='#E3E5E8' style={{width: 200, height: 20, borderRadius: 5}}/>
        <TextRow color='#E3E5E8' style={{width: 200, height: 20, borderRadius: 5}}/>
        <TextRow color='#E3E5E8' style={{width: 200, height: 20, borderRadius: 5}}/>
    </div>
);

function LabelsGrid(props) {

    let labels = [];
    let labelOptions = {
        format: "CODE39",
        lineColor: "black",
        width: 2, height: 100,
        font: "Helvetica",
        displayValue: true,
        textPosition: "bottom"
    };

    // if(props.labels.length > 0) {
    //     props.labels.forE
    // }
    for(let i = 0; i < 9; i++) {
        labels.push(
            <div className={styles.card} style={{background: "white"}}>
                <b>Barcode Name</b>
                <Barcode text={"SP17"} value={"Hello"} {...labelOptions}/>
            </div>
        );
    }

    return(
        <>
            <div className={styles.contents_grid}>
                <ReactPlaceholder ready={props.currentGroup !== undefined} customPlaceholder={labelPlaceholder} showLoadingAnimation={true}>
                    {labels}
                    {/*{props.labels.length < 1 ?*/}
                    {/*    <div className={styles.card} id="add-label">*/}
                    {/*        <span className={`no-select ${styles.no_select}`} >+ Add Label</span>*/}
                    {/*    </div>*/}
                    {/*    :*/}
                    {/*    <div className={styles.card} id="add-label">*/}
                    {/*        <span className={`no-select ${styles.no_select}`} >We have labels!</span>*/}
                    {/*    </div>*/}
                    {/*}*/}

                </ReactPlaceholder>
            </div>
            
        </>
    );

}

export default LabelsGrid;