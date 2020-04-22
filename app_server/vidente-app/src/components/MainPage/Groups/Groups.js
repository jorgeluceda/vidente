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

    function closeModal() {
        setModalState({isOpen: false, modalType: undefined});
        props.changeRelativePosition([0, 1]);
    }


    const handleChange = (value) => {
        props.changeRelativePosition([value, 1]);
        if(value === props.groups.length) {
            setModalState({isOpen: true, modalType: (value === props.groups.length) ? "editGroups" : "newGroup"});
        }
    }

    return(
        <>
            <GroupsModal modalState={modalState} onRequestClose={closeModal} closeModal={closeModal}
                         groups={props.groups} addNewGroup={props.addNewGroup} deleteGroup={props.deleteGroup}>
            </GroupsModal>


            <GroupsHeader openModal={openModal}/>

            <GroupsContent groups={props.groups} openModal={openModal}
                           relativePosition={props.relativePosition} handleChange={handleChange}/>
        </>
    );

}

export default Groups;