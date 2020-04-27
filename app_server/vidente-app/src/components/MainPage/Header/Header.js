import React from 'react';
import styles from './Header.module.css';

import {authService} from "../../../_services/authService";


function Header(props) {
    return (
        <div className={styles.header}>
        <a href="/">
            <h5 className="no-select">
                🔮
            </h5>
        </a>
        <h5 style={{color: "white", marginLeft: "0px", fontWeight: 600}}>
            Vidente
            {" "}
        </h5>

        <h6 style={{marginLeft: "0.5rem", justifyContents: "left", fontWeight: 300}}>
            About
        </h6>

        <button className={styles.logout_button} onClick={() => {
            authService.logout();
            props.changeLoginStatus(undefined, true);
        }}> Logout</button>
        </div>
  );
}

export default Header;