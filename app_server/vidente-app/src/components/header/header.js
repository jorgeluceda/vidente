import React from "react";

function Header() {
  return (
    <div className="header">
      <a href="/">
        <h5 className="no-select">
          🔮
        </h5>
      </a>
      <h5 style={{color: "white", marginLeft: "0px", fontWeight: 600}}>
        Vidente
        {" "}
      </h5>

      <h6 style={{marginLeft: "0.5rem", justifyContents: "left", fontWeight: 300}}>
        About
      </h6>

      <h6 style={{fontWeight: 300}}> Profile </h6>
      <h6 style={{fontWeight: 300}}> Logout</h6>
    </div>
  );
}

export default Header;
