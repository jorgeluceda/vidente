import React, { useEffect, useState} from 'react';

import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import Contents from "./Contents/Contents";

import styles from './MainPage.module.css';

import { userService } from "../../_services/userService";


function MainPage(props) {
    const [groups, setGroups] = useState([
        {emoji: "📝", name: "Edit Groups"},
    ]);

    console.log(JSON.stringify(groups));
    const [currentGroup, setCurrentGroup] = useState(undefined);

    useEffect(() => {
        userService.getAllGroups().then(
            (json) => {
                setGroups(groupsArray => [...json.groups, ...groupsArray]);
            }
        );
    }, [] );

    const addNewGroup = (newGroup) => {
        setGroups(groupsArray => [newGroup, ...groups]);
    }

    return(

        <div className={styles.main_page}>
                <Header changeLoginStatus={props.changeLoginStatus}></Header>
                <Menu groups={groups} addNewGroup={addNewGroup}></Menu>
                <Contents></Contents>
        </div>
    );
}

export default MainPage;