import React, { useEffect, useState} from 'react';

import Header from "./Header/Header";
import Groups from "./Groups/Groups";
import Labels from "./Labels/Labels";

import styles from './MainPage.module.css';

import { userService } from "../../_services/userService";


function MainPage(props) {
    const [groups, setGroups] = useState([
        {name: "Edit Groups"}
    ]);

    const [currentGroup, setCurrentGroup] = useState(undefined);

    useEffect(() => {
        userService.getAllGroups().then(
            (json) => {
                setGroups(groupsArray => [...json.groups, ...groupsArray]);
            }
        );
    }, [] );

    const addNewGroup = (newGroup) => {
        userService.createGroup(newGroup).then(() => {
            setGroups(groupsArray => [{name: newGroup}, ...groups]);
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
                <Groups groups={groups} addNewGroup={addNewGroup} deleteGroup={deleteGroup}></Groups>
                <Labels></Labels>
        </div>
    );
}

export default MainPage;