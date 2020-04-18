import React, { useState } from "react";

import styles from "./MenuContents.module.css";

import {useSpring, animated} from 'react-spring';
const translateScale = 2.25;

function MenuContents() {
    // useState([<positionEms>, <previousPositionEm>])
    const [relativePosition, setRelativePosition] = useState([0, 0]);

    const handleChange = (value) => {
        setRelativePosition([value, relativePosition[1]]);
    }

    const clickedAnimation = useSpring({
        config: { duration: 150},
        from: { transform: `translateY(${(relativePosition[1] * translateScale)}em)` },
        to: { transform: `translateY(${(relativePosition[0] * translateScale)}em)` }
    });
 
    const allGroups = [
        {label_icon: "🔥", label_name: "Favorites"},
        {label_icon: "🗑️", label_name: "Trash"},
    ]

    return(
        <>
            <div className={styles.menu}>
                <div className={styles.menu_contents}>
                    <div className={styles.strapline} id="strapline-short">
                        <animated.p className={`${styles.current_group}`} style={clickedAnimation} id="current_group">
                            <a className={styles.group}></a>
                
                        </animated.p>

                        {allGroups.map((group, i) => (
                            <p className="no-select">
                                <a className={styles.group} onClick={() => handleChange(i) }> 
                                {group.label_icon} &nbsp; {group.label_name} </a>
                            </p>  
                        ))}
                    </div>
                    <div className={styles.border_bottom}/>
                </div>
            </div>
            
        </>
    );
}



export default MenuContents;
