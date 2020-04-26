import React, { useEffect, useState} from 'react';

import Header from "./Header/Header";
import Groups from "./Groups/Groups";
import Labels from "./Labels/Labels";

import styles from './MainPage.module.css';

import { userService } from "../../_services/userService";
import NewLabelModal from "./Labels/NewLabelModal/NewLabelModal";
import EditLabelModal from "./Labels/EditLabelModal/EditLabelModal";
import LabelsHeader from "./Labels/LabelsHeader/LabelsHeader";
import LabelsGrid from "./Labels/LabelsGrid/LabelsGrid";
import {load} from "dotenv";

function MainPage(props) {
    const [groups, setGroups] = useState([]);
    const [labels, setLabels] = useState(undefined);
    const [relativePosition, setRelativePosition] = useState([0, true]);
    const [labelsLoaded, setLabelsLoaded] = useState(false);
    const [modalState, setModalState] = useState({isOpen: false, modalType: "newModal", currentLabel: undefined});

    const handleCard = (modalType, labelPosition ) => {
        setModalState({isOpen: true, modalType: (modalType.length > 0) ? "editLabel" : "newLabel",
            currentLabel: labels[labelPosition]});
    }

    function closeModal() {
        setModalState({isOpen: false, modalType: undefined});
        setRelativePosition([relativePosition[0], false]);
    }

    useEffect(() => {
        setLabelsLoaded(false);
        userService.getAllGroups().then(
            (groupsJson) => {
                setGroups(groupsJson.groups);
                if(groupsJson.groups[relativePosition[0]] !== undefined) {
                    userService.getLabels(groupsJson.groups[relativePosition[0]]._id).then((labelsJson) => {
                        setLabels(labelsJson.labels);
                        setLabelsLoaded(true);
                    });
                }
            }
        );
    }, [relativePosition]);

    const changeRelativePosition = (array) => {
        setRelativePosition(array);
    };

    const addNewGroup = (newGroup) => {
        userService.createGroup(newGroup).then((json) => {
            setGroups(json.groups);
        });
    }

    const deleteGroup = (groupId) => {
        userService.deleteGroup(groupId).then(() => {
            setGroups(groups.filter(group => group._id !== groupId));
        })
    }

    return(
        <div className={styles.main_page}>
            <Header changeLoginStatus={props.changeLoginStatus}></Header>

            <Groups groups={groups} relativePosition={relativePosition} changeRelativePosition={changeRelativePosition}
                addNewGroup={addNewGroup} deleteGroup={deleteGroup} />

            <Labels relativePosition={relativePosition} changeRelativePosition={changeRelativePosition}
                    groups={groups} labels={labels} labelsLoaded={labelsLoaded}
                    setModalState={setModalState} handleCard={handleCard}
                    modalState={modalState} closeModal={closeModal}/>

        </div>
    );
}

export default MainPage;