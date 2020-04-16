import React from 'react';

import styles from './ContentsGrid.module.css';

function ContentsGrid() {
    return(
        <>
            <div className={styles.contents_grid}>
                <div className={styles.card} id="add-label">
                    <span className={`no-select ${styles.no_select}`} >+ Add Label</span>
                </div>
            </div>
            
        </>
    );

}

export default ContentsGrid;