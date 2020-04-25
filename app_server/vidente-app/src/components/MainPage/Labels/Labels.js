import React, {useEffect, useState} from 'react';
import {userService} from "../../../_services/userService";

import LabelsHeader from "./LabelsHeader/LabelsHeader";
import LabelsGrid from './LabelsGrid/LabelsGrid';

import NewLabelModal from "./NewLabelModal/NewLabelModal";
import EditLabelModal from "./EditLabelModal/EditLabelModal";

function Labels(props) {
    const [groupAndLabels, setGroupAndLabels] = useState({
        group: undefined, labels: undefined
    });

    const [modalState, setModalState] = useState({isOpen: false, modalType: "newModal", currentLabel: ""});

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

    const handleCard = (modalType, labelPosition ) => {
        setModalState({isOpen: true, modalType: (modalType.length > 0) ? "editLabels" : "newLabel",
            currentLabel: (labelPosition !== undefined) ? groupAndLabels.labels[labelPosition] : ""});
    }
    // console.log(groupAndLabels.currentLabel);

    function closeModal() {
        setModalState({isOpen: false, modalType: undefined});
        props.changeRelativePosition([props.relativePosition[0], false]);
    }

    if(groupAndLabels.group !== undefined) {
        console.log(groupAndLabels.group.name);

    }

    return(
        <>

            {modalState.modalType == "newLabel" && groupAndLabels.group !== undefined && modalState.isOpen == true ?
                (
                    <NewLabelModal modalState={modalState} onRequestClose={closeModal} closeModal={closeModal}
                                   currentGroup={groupAndLabels.group}>
                    </NewLabelModal>
                ) :
                    <EditLabelModal modalState={modalState} onRequestClose={closeModal} closeModal={closeModal}
                                   currentGroup={groupAndLabels.group} currentLabel={groupAndLabels.currentLabel}>
                    </EditLabelModal>
            }

            {/* if the API call hasn't been made yet, render using the first position */}
            {groupAndLabels.group === undefined ?
                <>
                    <LabelsHeader handleCard={handleCard} groupName={props.groups[0].name}/>
                    <LabelsGrid currentGroup={groupAndLabels.group} labels={[]}
                                relativePosition={props.relativePosition} handleCard={handleCard}/>
                </>
                :
                <>
                    <LabelsHeader handleCard={handleCard} groupName={groupAndLabels.group.name}/>
                    <LabelsGrid currentGroup={groupAndLabels.group} labels={
                        (groupAndLabels.labels !== undefined) ? groupAndLabels.labels : []
                    } relativePosition={props.relativePosition} handleCard={handleCard}/>
                </>


            }
        </>
    );
}

export default Labels;