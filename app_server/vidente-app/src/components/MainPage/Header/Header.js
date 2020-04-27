import React from 'react';
import styles from './Header.module.css';

import {authService} from "../../../_services/authService";

import logo from "./logo.png"
function Header(props) {
    return (
        <div className={styles.header}>
        <button className={styles.header_button} style={{display: "flex", flexDirection: "row", alignItems: "center"}}
                onClick={() => {
                    window.open("https://vidente.herokuapp.com/","_self");
                }}>
            <h5 className="no-select">
                <img src={logo} style={{width: "1.50em"}} />
            </h5>
            <h5 style={{color: "white", marginLeft: "0px", fontWeight: 600}}>
                Vidente
                {" "}
            </h5>
        </button>

        <button className={styles.header_button} style={{marginLeft: "0rem", justifyContents: "left"}}
                onClick={() => {
                    window.open("https://vidente.herokuapp.com/","_self")
                }}>
            About
        </button>

        <button className={styles.header_button} onClick={() => {
            authService.logout();
            props.changeLoginStatus(undefined, true);
        }}> Logout</button>
        </div>
  );
}

export default Header;