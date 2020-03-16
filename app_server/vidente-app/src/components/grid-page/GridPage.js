import React, {Component, useEffect, useState} from "react";
import Header from "./header/Header";
import MenuHeader from "./menu-header/MenuHeader";
import Headline from "./headline/Headline";
import ContentsGrid from "./contents-grid/ContentsGrid";
import Footer from "./footer/Footer";

function GridPage(props) {
  const [group, setGroup] = useState(props.group);

  const callback = (val) => {
    setGroup(val);
  }

  return(
      <div className="grid-page">
        <Header>
        </Header>
        <MenuHeader/>
        <div className="menu">
          <div className="menu-contents">
            <PrintGroups groups={props.user.groups} group={group} size="2" type="short" parentCallback={callback}/>
            <PrintGroups groups={props.user.groups} group={group} size="13" type="long" parentCallback={callback}/>
          </div>
        </div>
        <Headline group={group}/>
        <ContentsGrid/>
        <Footer/>
      </div>
  );
}

function PrintGroups(props) {
  const [favorite, setFavorite] = useState(props.group);
  let groups = props.groups;

  useEffect(() => {
    setFavorite(props.group);
  }, [favorite]);
  let pruned = 0;
  const groupItems = groups.slice(0, props.size).map((function(item) {
    pruned += 1;
    // alert(`item name: ${item.name}, favorite state: ${group}`);
    if (item.name == favorite) {
      return <div className='no-select'><a>{item.name}</a></div>
    } else {
      return <p className="no-select"><a onClick={() => {
        setFavorite(item.name);
        props.parentCallback(item.name);
      }}>{item.name}</a></p>
    }
  }));

  pruned = props.groups.length - pruned;

  return (
    <div className={"strapline strapline-" + props.type} id={"strapline-" + props.type}>
      {groupItems}
      {/*.border-bottom(style="margin-top: 0.25rem; margin-bottom: 0.50rem")*/}
      <PrintExtraStrapline size={props.size} pruned={pruned}/>
    </div>
  );
}


function PrintExtraStrapline(props) {
  let borderBottom;
  let extraStrapline;
  if(props.size == "short") {
    borderBottom = <div className="border-bottom" style={{marginTop: "0.25rem", marginBottom: "0.50rem"}}/>
    extraStrapline =
      <p className="strapline-extra">
        <span className="no-select" style={{fontSize: "1rem", fontWeight: 800, color: "black"}}>
          +{props.pruned} Groups ✨ &nbsp;
        </span>
        <a className="no-select" href="google.com" style={{color: "#007AF", textDecoration: "none", fontWeight: 800}}>
          Expand ↗
        </a>
      </p>

  } else {
    borderBottom = <div className="border-bottom" style={{marginTop: "0.25rem", marginBottom: "0rem"}}/>
    extraStrapline =
      <p className="strapline-extra" style={{ marginTop: "0.5rem" }}>
        <span className="no-select" style={{fontSize: "1rem", fontWeight: 800, color: "black"}}>
          +{props.pruned} Groups ✨ &nbsp;
        </span>
        <a className="no-select" href="google.com" style={{color: "#007AF", textDecoration: "none", fontWeight: 800}}>
          Expand ↗
        </a>
      </p>
  }

  let total = [borderBottom, extraStrapline]

  return(
    total
  );

}

export default GridPage;