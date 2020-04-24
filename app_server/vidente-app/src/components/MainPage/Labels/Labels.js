import React, {useEffect, useState} from 'react';
import {userService} from "../../../_services/userService";

import LabelsHeader from "./LabelsHeader/LabelsHeader";
import LabelsGrid from './LabelsGrid/LabelsGrid';
import LabelsModal from "./LabelsModal/LabelsModal";

function Labels(props) {
    const [groupAndLabels, setGroupAndLabels] = useState({
        group: undefined, labels: undefined
    });

    const [modalState, setModalState] = useState({isOpen: false, modalType: "newModal"});

    useEffect(() => {
        if(props.groups[props.relativePosition[0]]) {
            userService.getLabels(props.groups[props.relativePosition[0]]._id).then(
                (json) => {
                    setGroupAndLabels({group: json.group, labels: json.labels});
                }
            );
        }
    //    NOTE: don't apply effect if relativePosition prop remains the same!
    }, [props.relativePosition, props.groups]);

    const handleCard = (value) => {
        setModalState({isOpen: true, modalType: (value.length > 0) ? "editLabels" : "newLabel"});
    }

    function closeModal() {
        setModalState({isOpen: false, modalType: undefined});
        props.changeRelativePosition([props.relativePosition[0], false]);
    }


    return(
        <>
            {groupAndLabels.group !== undefined && modalState.isOpen == true &&
                <LabelsModal modalState={modalState} onRequestClose={closeModal} closeModal={closeModal}
                             currentGroup={groupAndLabels.group}>
                </LabelsModal>
            }

            <>
                <LabelsHeader handleCard={handleCard} groupName={(groupAndLabels.groups !== undefined)
                    ? groupAndLabels.group.name
                    : props.groups[0].name
                }/>
                <LabelsGrid currentGroup={groupAndLabels.group} labels={
                    (groupAndLabels.labels !== undefined) ? groupAndLabels.labels : []
                } relativePosition={props.relativePosition} handleCard={handleCard}/>
            </>
        </>
    );
}

export default Labels;