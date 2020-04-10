import React from 'react';
import Pagination from "../pagination/Pagination";
import Barcode from "react-barcode";
import ReactPlaceholder from "react-placeholder";
import TextRow from "react-placeholder/lib/placeholders/TextRow";

const groupTitlePlaceholder = (
  <div>
    <TextRow color='#E3E5E8' style={{width: 100, height: 20}}/>
  </div>
);

function ContentsGrid(props) {
  let labels = [];
  let message = [];
  let labelOptions = {
    format: "CODE39",
    lineColor: "black",
    width: 20, height: 50,
    font: "Helvetica",
    displayValue: true,
    textPosition: "bottom"
  };

  if(props.labels != null) {
    props.labels.forEach(label => {
      labels.push(
        <div className="card" style={{background: "white"}}>
          <b>Barcode Title</b>
          <Barcode text={"SP17"} value={"Hello"}/>
        </div>
      );
    });
      
    if(labels.length <= 0) {
      message.push(
        <div className="card" id="add-label"
             style={{background: "white", borderStyle: "dashed", borderWidth: "3px",
               borderColor: "#3192FE", backgroundColor: "#F0F7FF", color: "#007AFF"}}>
              <span className="no-select" style={{fontSize: "1.25rem"}}>+ Add Label</span>
        </div>
      )
    }
  }


  return(
    <div className="contents-grid" style={{marginTop: "1rem"}}>
      <ReactPlaceholder customPlaceholder={groupTitlePlaceholder} ready={props.ready} showLoadingAnimation="true">
        {labels}
        {message}
      </ReactPlaceholder>
    </div>

  );
}

export default ContentsGrid;