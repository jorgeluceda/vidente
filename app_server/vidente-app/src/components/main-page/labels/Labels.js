import Headline from "../groups/headline/Headline";
import ContentsGrid from "./contents-grid/ContentsGrid";
import React, {useEffect, useState} from "react";
import {userService} from "../../_services/userService";


function Labels(props) {
  const [ready, setReady] = useState(props.ready);
  const [groupName, setGroupName] = useState();
  const [labels, setLabels] = useState(null);

  const updateTimer = React.useRef(null);

  React.useEffect(() => {
    if(props.changedGroup) {
      setReady(false);

      userService.getLabels(props.groupId).then(response => {
        setGroupName(response.group.name);
        setLabels(response.labels);
      }).then(() => {
          setTimeout(() => {
            setReady(true);
          }, 10);
        }
      );
    }
  }, [props.groupId]);

  useEffect(() => {
    if(props.ready && !props.changedGroup) {
      userService.getLabels(props.groupId).then(response => {
        setGroupName(response.group.name);
        setLabels(response.labels);
        // alert(response.group.name);
      }).then(() => {
          setTimeout(() => {
            setReady(true);
          }, 10);
        }
      );
    }
  }, []);

  return(
    <>
      <Headline groupName={groupName} ready={ready}/>
      <ContentsGrid/>
    </>
  );
}

export default Labels;