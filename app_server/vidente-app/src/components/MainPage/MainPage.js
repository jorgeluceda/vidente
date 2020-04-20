import React, { useEffect, useState} from 'react';

import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import Contents from "./Contents/Contents";

import styles from './MainPage.module.css';

import { userService } from "../../_services/userService";


function MainPage(props) {
    const [groups, setGroups] = useState([
        {icon: "📝", name: "Edit Groups"},
    ]);

    const [currentGroup, setCurrentGroup] = useState(undefined);

    useEffect(() => {
        userService.getAllGroups().then(
            (json) => {
                setGroups(groupsArray => [...json.groups, ...groupsArray]);
            }
        );
    }, [] );

    return(

        <div className={styles.main_page}>
                <Header changeLoginStatus={props.changeLoginStatus}></Header>
                <Menu groups={groups}></Menu>
                <Contents></Contents>
        </div>
    );
}

export default MainPage;