import React from "react";

import styles from "./GroupsContent.module.css";

import {useSpring, animated} from 'react-spring';

import ReactPlaceholder from 'react-placeholder';
import TextRow from "react-placeholder/lib/placeholders/TextRow";
import 'react-placeholder/lib/reactPlaceholder.css';

const menuPlaceholder = (
    <div>
      <TextRow color='#E3E5E8' style={{width: 200, height: 20, borderRadius: 5}}/>
      <TextRow color='#E3E5E8' style={{width: 200, height: 20, borderRadius: 5}}/>
      <TextRow color='#E3E5E8' style={{width: 200, height: 20, borderRadius: 5}}/>
    </div>
  );
  
const translateScale = 2.25;

function GroupsContent(props) {
    const clickedAnimation = useSpring({
        config: { duration: 150},
        from: { transform: `translateY(${(props.relativePosition[1] * translateScale)}em)` },
        to: { transform: `translateY(${(props.relativePosition[0] * translateScale)}em)` }
    });
 
    return(
        <>
            <div className={styles.menu}>
                <div className={styles.menu_contents}>
                    <ReactPlaceholder ready={props.groups.length > 0} customPlaceholder={menuPlaceholder} showLoadingAnimation={true}>
                        <div className={styles.strapline} id="strapline-short">
                            <animated.p className={`${styles.current_group}`} style={clickedAnimation} id="current_group">
                                <span className={styles.group}/>
                            </animated.p>

                            {props.groups.map((group, i) => (
                                <p className={'no-select'} key={i} onClick={() => props.handleChange(i) }>
                                    {/* group / layers icon */}
                                    <div className={styles.groupOriginal} >
                                    <svg className={styles.groupSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#464646" d="M21,9v9a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2V6A2,2,0,0,1,5,4h5.28a2,2,0,0,1,1.9,1.37L12.72,7H19A2,2,0,0,1,21,9Z"/></svg>
                                     &nbsp; {group.name} </div>
                                </p>
                            ))}

                            <p className={'no-select'} onClick={() => props.handleChange(props.groups.length) }>
                                <div className={styles.groupOriginal} >
                                <svg className={styles.groupSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#464646" d="M17,22H5a3,3,0,0,1-3-3V7A3,3,0,0,1,5,4H9A1,1,0,0,1,9,6H5A1,1,0,0,0,4,7V19a1,1,0,0,0,1,1H17a1,1,0,0,0,1-1V15a1,1,0,0,1,2,0v4A3,3,0,0,1,17,22Z"/><path fill="#464646" d="M14.6 5.87l-4.95 5a.41.41 0 0 0-.13.23l-1 3.82a.48.48 0 0 0 .13.48A.47.47 0 0 0 9 15.5a.32.32 0 0 0 .13 0l3.82-1a.41.41 0 0 0 .23-.13L18.13 9.4zM21 4.45L19.55 3a1.52 1.52 0 0 0-2.13 0L16 4.45 19.55 8 21 6.58A1.52 1.52 0 0 0 21 4.45z"/></svg>
                                 &nbsp; Edit Groups </div>
                            </p>
                        </div>
                        <div className={styles.border_bottom}/>
                    </ReactPlaceholder>
                </div>
            </div>
        </>
    );
}



export default GroupsContent;
