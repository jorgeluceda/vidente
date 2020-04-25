import React, { useEffect, useState} from 'react';

import Header from "./Header/Header";
import Groups from "./Groups/Groups";
import Labels from "./Labels/Labels";

import styles from './MainPage.module.css';

import { userService } from "../../_services/userService";

function MainPage(props) {
    const [groups, setGroups] = useState([]);
    const [labels, setLabels] = useState(undefined);
    const [relativePosition, setRelativePosition] = useState([0, true]);

    const [modalState, setModalState] = useState({isOpen: false, modalType: "newModal", currentLabel: undefined});

    const handleCard = (modalType, labelPosition ) => {
        setModalState({isOpen: true, modalType: (modalType.length > 0) ? "editLabel" : "newLabel",
            currentLabel: ""});
    }

    function closeModal() {
        setModalState({isOpen: false, modalType: undefined});
        setRelativePosition([relativePosition[0], false]);
    }

    useEffect(() => {
        userService.getAllGroups().then(
            (groupsJson) => {
                setGroups(groupsJson.groups);
                if(groupsJson.groups[relativePosition[0]] !== undefined) {
                    userService.getLabels(groupsJson.groups[relativePosition[0]]._id).then((labelsJson) => {
                        setLabels(labelsJson.labels);
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

            {groups !== undefined &&
                <Groups groups={groups} relativePosition={relativePosition} changeRelativePosition={changeRelativePosition}
                    addNewGroup={addNewGroup} deleteGroup={deleteGroup} />
            }

            {/* Only render Labels component if we have received our groups */}
            {groups !== undefined && labels !== undefined &&
                <Labels relativePosition={relativePosition} changeRelativePosition={changeRelativePosition}
                        groups={groups} labels={labels} setModalState={setModalState} handleCard={handleCard}
                        modalState={modalState} closeModal={closeModal}/>
            }
        </div>
    );
}

export default MainPage;