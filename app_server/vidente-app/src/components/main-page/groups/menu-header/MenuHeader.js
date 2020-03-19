import React, {useState} from 'react';

function MenuHeader(props) {
  return(
    <div className="menu-header">

      <div className="mh-contents">
        <h6>
          Groups&nbsp;&nbsp;
        </h6>
        <button onTouchStart="" onClick={() => {
          props.parentCallback(true);
        }}>
          <span
            // props.parentCallback()
          > New Group </span>
        </button>
      </div>

      <div className="border-bottom"/>
    </div>
  );
}

export default MenuHeader;

