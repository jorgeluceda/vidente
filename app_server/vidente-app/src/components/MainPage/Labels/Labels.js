import React from 'react';

import LabelsHeader from "./LabelsHeader/LabelsHeader";
import LabelsGrid from './LabelsGrid/LabelsGrid';

import NewLabelModal from "./NewLabelModal/NewLabelModal";
import EditLabelModal from "./EditLabelModal/EditLabelModal";

function Labels(props) {
    return(
        <>
            {props.modalState.modalType === "newLabel" &&
            <NewLabelModal modalState={props.modalState} onRequestClose={props.closeModal} closeModal={props.closeModal}
                           currentGroup={props.groups[props.relativePosition[0]]}>
            </NewLabelModal>

            }

            {props.modalState.modalType === "editLabel" &&
            <EditLabelModal modalState={props.modalState} closeModal={props.closeModal}
                            currentGroup={props.groups[props.relativePosition[0]]} currentLabel={props.modalState.currentLabel}>
            </EditLabelModal>
            }

            <LabelsHeader handleCard={props.handleCard} groupName={props.groups[props.relativePosition[0]] === undefined ?
                "Edit Groups " :
                props.groups[props.relativePosition[0]].name
            }/>

            <LabelsGrid currentGroup={props.groups[props.relativePosition[0]]} labels={props.labels}
                        labelsLoaded={props.labelsLoaded} relativePosition={props.relativePosition}
                        handleCard={props.handleCard}/>
        </>
    );
}

export default Labels;