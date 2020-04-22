import React, { useEffect, useState} from 'react';

import Header from "./Header/Header";
import Groups from "./Groups/Groups";
import Labels from "./Labels/Labels";

import styles from './MainPage.module.css';

import { userService } from "../../_services/userService";


function MainPage(props) {
    const [groups, setGroups] = useState([]);

    const [relativePosition, setRelativePosition] = useState([0, 0]);

    useEffect(() => {
        userService.getAllGroups().then(
            (json) => {
                setGroups(groupsArray => [...json.groups, ...groupsArray]);
            }
        );
    }, []);

    const changeRelativePosition = (array) => {
        setRelativePosition(array);
    };

    const addNewGroup = (newGroup) => {
        userService.createGroup(newGroup).then((json) => {
            alert(JSON.stringify(json.groups));
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

            {/* Only render Labels component if we have received our groups */}
            {groups.length > 0 &&
                <Labels relativePosition={relativePosition} changeRelativePosition={changeRelativePosition}
                        groups={groups}/>
            }
        </div>
    );
}

export default MainPage;