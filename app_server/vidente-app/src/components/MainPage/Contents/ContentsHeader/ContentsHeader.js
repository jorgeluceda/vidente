import React from 'react';

import styles from './ContentsHeader.module.css';

function ContentsHeader() {
    return(
        <div className={styles.headline}>
            <div className={styles.headline_contents}>
                <h5>  Favorites &nbsp; &nbsp;
                </h5>
                <div className={styles.button_curved} href="">
                    <span>
                        <div className={styles.glyph_add}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="glyph-add" aria-hidden="true">
                                <path d="M15.169 21.24v-4.423h-4.387a.824.824 0 01-.818-.813c0-.448.379-.821.818-.821h4.387V10.76c0-.44.38-.796.827-.796.447 0 .827.356.827.796v4.423h4.395c.447 0 .818.373.818.821a.82.82 0 01-.818.813h-4.395v4.423c0 .431-.38.796-.827.796-.447 0-.827-.365-.827-.796z"></path>
                            </svg>
                        </div>
                    </span>
                    <span>Add Label</span>
                </div>
            </div>
            <div className={styles.border_bottom}></div>
        </div>
    );
}

export default ContentsHeader;