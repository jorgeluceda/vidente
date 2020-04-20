import React from 'react';

import styles from './MenuHeader.module.css';

function MenuHeader(props) {
    return(
        <div className={styles.menu_options}>
            <div className={styles.mo_contents}>
            <h6>
                Groups&nbsp;&nbsp;
            </h6>
            <button className={styles.header_button} onTouchStart="" onClick={() => {
                props.openModal();
            }}>
                <span
                > New Group </span>
            </button>
            </div>
    
            <div className={styles.border_bottom}/>
        </div>
    );
}

export default MenuHeader;