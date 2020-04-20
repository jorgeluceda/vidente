import React, { useState } from 'react';

import styles from './GroupsModal/GroupsModal.module.css';

import GroupsHeader from "./GroupsHeader/GroupsHeader";
import GroupsContent from "./GroupsContent/GroupsContent";

import { userService } from '../../../_services/userService';
import GroupsModal from "./GroupsModal/GroupsModal";

function Groups(props) {

    const [modalState, setModalState] = useState({isOpen: false, modalType: "newModal"});
    function openModal(newOrEditModal) {
        setModalState({isOpen: true, modalType: newOrEditModal});
    }

    function closeModal(){
        setModalState({isOpen: false, modalType: undefined});
    }

    const [newGroup, setNewGroup] = useState(undefined);

    const onSubmit = data => console.log(data);

    const [relativePosition, setRelativePosition] = useState([0, 0]);

    const handleChange = (value) => {
        setRelativePosition([value, relativePosition[1]]);
        if(value === props.groups.length - 1) {
            setModalState({isOpen: true, modalType: (value === props.groups.length - 1) ? "editGroups" : "newGroup"});
        };
    }

    return(
        <>
            <GroupsModal modalState={modalState} onRequestClose={closeModal} closeModal={closeModal}
                         groups={props.groups} addNewGroup={props.addNewGroup}>
            </GroupsModal>


            <GroupsHeader openModal={openModal}></GroupsHeader>
            <GroupsContent groups={props.groups} openModal={openModal}
                           relativePosition={relativePosition} handleChange={handleChange} ></GroupsContent>
        </>
    );

}

export default Groups;