import MenuHeader from "./menu-header/MenuHeader";
import ReactPlaceholder from "react-placeholder";
import Headline from "./headline/Headline";
import React, {useEffect, useState} from "react";
import TextRow from "react-placeholder/lib/placeholders/TextRow";
import {userService} from "../../_services/userService";
import AriaModal from "react-aria-modal";
import Labels from "../labels/Labels";

const menuPlaceholder = (
  <div>
    {/*<RectShape color='blue' style={{width: 30, height: 80}}/>*/}
    <TextRow color='#E3E5E8' style={{width: 200, height: 20}}/>
    <TextRow color='#E3E5E8' style={{width: 200, height: 20}}/>
    <TextRow color='#E3E5E8' style={{width: 200, height: 20}}/>

  </div>
);


function Groups() {
  const [groups, setGroups] = useState([{name: "Favorites"}]);
  const [favoriteGroup, setFavoriteGroup] = useState();
  const [ready, setReady] = useState(false);
  const [changedGroup, setChangedGroup] = useState(false);
  const [activeNewGroupModal, setActiveNewGroupModal] = useState(false);

  useEffect(() => {
    userService.getAllGroups().then(user => {
      setGroups(user.groups);
      setFavoriteGroup(user.groups[0]._id);
    }).then(() => {
      setTimeout(() => {
      setReady(true);
    }, 10);
    }

    );
  }, [setReady]);

  const favoriteGroupCallback = (val) => {
    setChangedGroup(true);
    setFavoriteGroup(val);
  };

  const newGroupCallback = (visible, groupName) => {
    setActiveNewGroupModal(visible);

    if(groupName) {
      fetch("/api/user/5e7259bd590e1732786a164b/groups",
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({name: groupName})
        })
        .then(response => response.json())
        .then(json => {
          let appendedGroup = groups;
          appendedGroup.push({name: groupName});
          setGroups(appendedGroup);
          setFavoriteGroup(groupName);
        });
    }
  };


  return(
    <>
      <MenuHeader parentCallback={newGroupCallback}/>
      <div className="menu" style={{paddingBottom: "0.25em"}}>
        <ReactPlaceholder ready={ready} customPlaceholder={menuPlaceholder} showLoadingAnimation="true">
          <div className="menu-contents">
            <PrintGroups groups={groups} groupId={favoriteGroup}
                         size="2" type="short" parentCallback={favoriteGroupCallback}/>
            <PrintGroups groups={groups} groupId={favoriteGroup}
                         size="13" type="long" parentCallback={favoriteGroupCallback}/>
          </div>
        </ReactPlaceholder>
      </div>

      {!ready ?  (
        <Labels groupId={favoriteGroup} ready={false}/>

      ) : ready && changedGroup ? (
          <Labels groupId={favoriteGroup} ready={true} changedGroup={true}/>
        )
        : (
        <>
        <Labels groupId={favoriteGroup} ready={true}/>
        </>
      )
      }

      {activeNewGroupModal &&
      <AriaModal titleText="Create New Group" initialFocus={"#root"}
                 verticallyCenter="true">
        <div className="card-new" style={{width: "15rem", height: "11.5rem", margin: 0, padding: 0}}>
          <b style={{paddingTop: "15px", alignSelf: "flex-start",
            marginTop: "5px", paddingLeft: "1rem"
          }}>Create New Group</b>
          <div style={{paddingTop: "0.5rem", paddingLeft: "1rem"}}>Group Name: </div>
          <input id="newGroupInput" type="text"
                 style={{width: "10rem", marginLeft: "1rem", marginBottom: "1rem"}}>
          </input>

          <span style={{display: "flex", justifyContent: "flex-end", flexDirection: "row"}}>
                <div className="button-secondary" onClick={() => { newGroupCallback(false);}} style={{
                  alignSelf: "flex-end", marginRight: "0.5rem", marginTop: "0.5rem",
                  backgroundColor: "white", color: "black"
                }}>Cancel</div>
                <div className="button-secondary" onClick={() => {
                  newGroupCallback(false, document.getElementById("newGroupInput").value);
                }} style={{
                  alignSelf: "flex-end", marginRight: "0.5rem", marginTop: "0.5rem", color: "white",
                  backgroundColor: "#3085FC", backgroundImage: "none", borderColor: "#3085FC"
                }}>Create</div>
              </span>
        </div>
      </AriaModal>
      }
    </>
  );
}

function PrintGroups(props) {
  // const [favorite, setFavorite] = useState(props.group);
  let groups = props.groups;
  let pruned = 0;
  const groupItems = groups.slice(0, props.size).map((function(item) {
    pruned += 1;
    if (item._id == props.groupId) {
      return <div className='no-select'><a>{item.name}</a></div>
    } else {
      return <p className="no-select"><a onClick={() => {
        // setFavorite(item.name);
        props.parentCallback(item._id);
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
        <span className="no-select" style={{fontSize: "0.9rem", fontWeight: 700, color: "black"}}>
          +{props.pruned} Groups ✨ &nbsp;
        </span>
        <a className="no-select" href="google.com" style={{fontSize: "0.9rem", color: "#007AF", textDecoration: "none", fontWeight: 700}}>
          Expand ↗
        </a>
      </p>
  }

  let total = [borderBottom, extraStrapline]

  return(
    total
  );
}


export default Groups;