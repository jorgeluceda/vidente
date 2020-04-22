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
    console.log(props.labels);
    return(
        <>
            <div className={styles.contents_grid}>
                <ReactPlaceholder ready={props.currentGroup !== undefined} customPlaceholder={labelPlaceholder} showLoadingAnimation={true}>
                    {props.labels.length < 1 ?
                        <div className={styles.card} id="add-label">
                            <span className={`no-select ${styles.no_select}`} >+ Add Label</span>
                        </div>
                        :
                        <div className={styles.card} id="add-label">
                            <span className={`no-select ${styles.no_select}`} >We have labels!</span>
                        </div>
                    }

                </ReactPlaceholder>
            </div>
            
        </>
    );

}

export default LabelsGrid;