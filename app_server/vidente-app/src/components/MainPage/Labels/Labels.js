import React, {useEffect, useState} from 'react';

import styles from './Labels.module.css';

import LabelsHeader from "./LabelsHeader/LabelsHeader";
import LabelsGrid from './LabelsGrid/LabelsGrid';
import {userService} from "../../../_services/userService";


function Labels(props) {
    const [groupAndLabels, setGroupAndLabels] = useState({group: undefined, labels: []});

    useEffect(() => {
        if(props.groups[props.relativePosition[0]]) {
            userService.getLabels(props.groups[props.relativePosition[0]]._id).then(
                (json) => {
                    setGroupAndLabels({group: json.group, labels: json.labels});
                }
            );
        }
    //    NOTE: don't apply effect if relativePosition prop remains the same!
    }, [props.relativePosition]);

    return(
        <>
            {groupAndLabels.group !== undefined ?
                <>
                    <LabelsHeader groupName={groupAndLabels.group.name}/>
                    <LabelsGrid currentGroup={groupAndLabels.group} labels={groupAndLabels.labels}/>
                </>
                :
                <>
                    <LabelsHeader groupName={props.groups[0].name}/>
                    <LabelsGrid currentGroup={groupAndLabels.group} labels={[]}/>
                </>
            }

        </>
    );
}

export default Labels;