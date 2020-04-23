import React from 'react';

import styles from './GroupsHeader.module.css';

function GroupsHeader(props) {
    return(
        <div className={styles.menu_options}>
            <div className={styles.mo_contents}>
            <h6 className={`no-select ${styles.menu_header_title}`}>
                Groups&nbsp;&nbsp;
            </h6>
            <button className={styles.header_button} onTouchStart={() => {}} onClick={() => {
                props.openModal("newModal");
            }}>
                <span
                > New Group </span>
            </button>
            </div>
    
            <div className={styles.border_bottom}/>
        </div>
    );
}

export default GroupsHeader;