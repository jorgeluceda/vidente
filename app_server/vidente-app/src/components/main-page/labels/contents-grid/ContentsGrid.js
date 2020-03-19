import React from 'react';
import Pagination from "../pagination/Pagination";


function ContentsGrid() {
  let labels = [];
  for(let i = 0; i < 8; i++) {
    labels[i] =
      <div className="card" style={{background: "white"}}>
      </div>
  }
  return(
    <div className="contents-grid">
      {labels}
    </div>

  );
}

export default ContentsGrid;