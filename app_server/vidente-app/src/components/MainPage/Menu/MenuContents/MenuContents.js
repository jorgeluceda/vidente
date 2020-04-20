import React, { useState } from "react";

import styles from "./MenuContents.module.css";

import {useSpring, animated} from 'react-spring';

import ReactPlaceholder from 'react-placeholder';
import TextRow from "react-placeholder/lib/placeholders/TextRow";
import 'react-placeholder/lib/reactPlaceholder.css';

const menuPlaceholder = (
    <div>
      {/*<RectShape color='blue' style={{width: 30, height: 80}}/>*/}
      <TextRow color='#E3E5E8' style={{width: 200, height: 20, borderRadius: 5}}/>
      <TextRow color='#E3E5E8' style={{width: 200, height: 20, borderRadius: 5}}/>
      <TextRow color='#E3E5E8' style={{width: 200, height: 20, borderRadius: 5}}/>
      <TextRow color='#E3E5E8' style={{width: 200, height: 20, borderRadius: 5}}/>
      <TextRow color='#E3E5E8' style={{width: 200, height: 20, borderRadius: 5}}/>
      <TextRow color='#E3E5E8' style={{width: 200, height: 20, borderRadius: 5}}/>
    </div>
  );
  
const translateScale = 2.25;

function MenuContents(props) {
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
 
    return(
        <>
            <div className={styles.menu}>
                <div className={styles.menu_contents}>
                    <ReactPlaceholder ready={props.groups.length > 1} customPlaceholder={menuPlaceholder} showLoadingAnimation={true}>
                        <div className={styles.strapline} id="strapline-short">
                            <animated.p className={`${styles.current_group}`} style={clickedAnimation} id="current_group">
                                <a className={styles.group}></a>
                            </animated.p>

                            {props.groups.map((group, i) => (
                                <p className={`no-select ${styles.modal_p}`}>
                                    <a className={styles.group} onClick={() => handleChange(i) }> 
                                    {group.emoji} &nbsp; {group.name} </a>
                                </p>  
                            ))}
                        </div>
                        <div className={styles.border_bottom}/>
                    </ReactPlaceholder>
                </div>
            </div>
        </>
    );
}



export default MenuContents;
