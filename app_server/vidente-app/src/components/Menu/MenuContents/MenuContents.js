import React, { useState } from "react";

import styles from "./MenuContents.module.css";

import {useSpring, animated} from 'react-spring';

const translateScale = 2.25;

function MenuContents() {
    // useState([<positionEms>, <previousPositionEm>])
    const [relativePosition, setRelativePosition] = useState([0, 0]);

    const handleChange = (event) => {
        setRelativePosition([event.target.value, relativePosition[1]]);
    }
    const clickedAnimation = useSpring({
        config: { duration: 200},
        from: { transform: `translateY(${(relativePosition[1] * translateScale)}em)` },
        to: { transform: `translateY(${(relativePosition[0] * translateScale)}em)` }
    });
 
    const allGroups = [
        {label_icon: "🔥", label_name: "Favorites"},
        {label_icon: "📝", label_name: "Edit Groups"},
        {label_icon: "🗑️", label_name: "Trash"},
    ]

    const groups = [];

    for(var i = 0; i < allGroups.length; i++) {
        groups.push(
            <p className="no-select">
                <a className={styles.group} value={i} onClick={(event) => handleChange(event.target.value)}> 
                {allGroups[i].label_icon} &nbsp; {allGroups[i].label_name} </a>
            </p>
        );
    }

    return(
        <>
            <div className={styles.menu}>
                <div className={styles.menu_contents}>
                    <div className={styles.strapline} id="strapline-short">
                        <animated.p className={`${styles.current_group}`} style={clickedAnimation} id="current_group">
                            <a className={styles.group}></a>
                        </animated.p>

                        {groups}
                        {/* <p className="no-select">
                            <a className={styles.group}>🔥 &nbsp; Favorites</a>
                        </p>

                        <p className="no-select">
                            <a className={styles.group} onClick={() => {
                                setRelativePosition([1, relativePosition[0]]);
                            }}>📝 &nbsp; Edit groups</a>
                        </p>

                        <p className="no-select">
                            <a className={styles.group}>🗑️ &nbsp; Trash</a>
                        </p> */}
                    </div>
                    <div className={styles.border_bottom}/>
                </div>
            </div>
            
        </>
    );
}



export default MenuContents;
