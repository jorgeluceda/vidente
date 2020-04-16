import React from "react";

import styles from "./MenuContents.module.css";

function MenuContents() {
    return(
        <>
            <div class={styles.menu}>
                <div class={styles.menu_contents}>
                    <div className={styles.strapline} id="strapline-short">
                        <div className="no-select">
                            <a className={styles.favorite_group}>Favorites</a>
                        </div>
                    </div>
                    <div className={styles.border_bottom}/>
                </div>
            </div>

        </>
    );
}

export default MenuContents;

//  style="padding-bottom: 0.25em;"


// style="margin-top: 0.25rem; margin-bottom: 0rem;"