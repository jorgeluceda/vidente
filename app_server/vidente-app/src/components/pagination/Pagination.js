import React from 'react';

function Pagination() {
  return(
    <span style={{display: "flex", alignContent: "center", marginTop: ".35rem", marginBottom: ".35rem"}}>
      <div className="pagination-button left-t no-select" onTouchStart=""> {"<<"} </div>
      <div className="pagination-button left-o no-select" onTouchStart=""> {"<"} </div>
      &nbsp;&nbsp;
      <span className="no-select" style={{display: "flex", fontSize: ".85rem"}}>
        1 of 2
        &nbsp;&nbsp;
      </span>
      <div className="pagination-button right-o no-select" onTouchStart=""> {">"} </div>
      <div className="pagination-button right-t no-select" onTouchStart=""> {">>"} </div>

    </span>
  );
}

export default Pagination;