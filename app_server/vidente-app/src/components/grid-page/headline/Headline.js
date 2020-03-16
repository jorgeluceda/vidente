import React from "react";
import Pagination from "../pagination/Pagination";
function Headline(props) {
  return(
    <div className="headline">
      <div className="headline-contents">
        <h6>&emsp; {props.group} &nbsp; &nbsp;</h6>
        <div className="button-curved" href="" onTouchStart="">
          <span>
            <div className="glyph-add">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="glyph-add" aria-hidden="true">
                <path d="M15.169 21.24v-4.423h-4.387a.824.824 0 01-.818-.813c0-.448.379-.821.818-.821h4.387V10.76c0-.44.38-.796.827-.796.447 0 .827.356.827.796v4.423h4.395c.447 0 .818.373.818.821a.82.82 0 01-.818.813h-4.395v4.423c0 .431-.38.796-.827.796-.447 0-.827-.365-.827-.796z">
                </path>
              </svg>
            </div>
          </span>
          <span>Add Label</span>
        </div>
      </div>
      <div className="border-bottom"/>
      <Pagination/>
    </div>
  );
}

export default Headline;