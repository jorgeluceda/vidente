import React from 'react';

import styles from './LabelsGrid.module.css';
import ReactPlaceholder from "react-placeholder";

import TextRow from "react-placeholder/lib/placeholders/TextRow";

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
    return(
        <>
            <div className={styles.contents_grid}>
                <ReactPlaceholder ready={props.currentGroup} customPlaceholder={labelPlaceholder} showLoadingAnimation={true}>
                    <div className={styles.card} id="add-label">
                        <span className={`no-select ${styles.no_select}`} >+ Add Label</span>
                    </div>
                </ReactPlaceholder>
            </div>
            
        </>
    );

}

export default LabelsGrid;