import React from 'react';

import styles from './MenuHeader.module.css';

function MenuOptions() {
    return(
        <div className={styles.menu_options}>
            <div className={styles.mo_contents}>
            <h6>
                Groups&nbsp;&nbsp;
            </h6>
            <button className={styles.header_button} onTouchStart="" onClick={() => {
                // props.parentCallback(true);
            }}>
                <span
                // props.parentCallback()
                > New Group </span>
            </button>
            </div>
    
            <div className={styles.border_bottom}/>
      </div>
    );
}

export default MenuOptions;