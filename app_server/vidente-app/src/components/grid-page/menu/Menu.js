import React from "react";

let favorite = "Favorites";
let groups = ["Favorites", "Electronics", "Accessories", "Dogs",
  "Health", "Food"];

function Menu() {
  return(
    <div className="menu">
      <div className="menu-contents">
          <PrintGroups groups={groups} favorite={favorite} size="2" type="short"/>
          <PrintGroups groups={groups} favorite={favorite} size="13" type="long"/>
      </div>
    </div>
  );
}

function PrintGroups(props) {
  favorite = props.favorite;

  let pruned = 0;
  const groupItems = props.groups.slice(0, props.size).map((function(group) {
    pruned += 1;

    if (group == favorite) {
      return <div><a>{group}</a></div>
    } else {
      return <p>{group}</p>
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

function PrintGroupsLarge(props) {
  favorite = props.favorite;

  const groupItems = props.groups.map((function(group) {
    if (group == favorite) {
      return <div><a>{group}</a></div>
    } else {
      return <p>{group}</p>
    }
  }));

  return (
    <div className="strapline strapline-long" id="strapline-long">
      {groupItems}
      <PrintExtraStrapline size="long"/>

    </div>
  );
}

function MenuContentsListLarge(props) {
  const groups = props.groups;
  // alert(groups);
  const groupItems = groups.map((group) =>
    <li>{group}</li>
  );

  return (
    <ul>{groupItems}</ul>
  );
}

export default Menu;