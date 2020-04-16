import React from 'react';

import styles from './Footer.module.css';

function Footer() {
    return(
        <div className={styles.footer}>
            <span className="no-select">© Copyright 2020 - Jorge Euceda</span>
        </div>
    );
}

export default Footer;