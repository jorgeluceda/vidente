import Modal from "react-modal";
import React, {useEffect, useState} from "react";
import {userService} from "../../../../_services/userService";
import styles from "./GroupsModal.module.css";

Modal.setAppElement('#root');

const newGroupModalStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
};

function GroupsModal(props) {
    let poppedGroup = props.groups;
    const [selectedInput, setSelectedInput] = useState([0, true]);

    return(
        <Modal isOpen={props.modalState.isOpen} onRequestClose={() => {
            setSelectedInput([0, true]);
            props.onRequestClose();
        }} style={newGroupModalStyles} contentLabel="Example Modal">
            <div className={`no-select`}>
            {props.modalState.modalType === "newModal"
                ?
                    <h5>Create New Group</h5>
                :
                    <h5>Edit Groups</h5>
            }
            </div>

            <h5 className={`no-select`}>&nbsp;</h5>

            <form className={styles.modal_form} onSubmit={(e) => {
                e.preventDefault();
                const {name} = e.target;
                if(name.value != "") {
                        props.addNewGroup(name.value);
                } else {
                    console.log("Not going to do anything...");
                }
            }}>
                {selectedInput[1] == true &&
                    <a onClick={() => setSelectedInput([0, false])}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.5em">
                            <path fill="#464646" d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm3.21,11.79a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0L12,13.41l-1.79,1.8a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42L10.59,12l-1.8-1.79a1,1,0,0,1,1.42-1.42L12,10.59l1.79-1.8a1,1,0,0,1,1.42,1.42L13.41,12Z"/>
                        </svg>
                    </a>
                }

                <input className={styles.new_group_input} autoFocus={selectedInput[1] === true}
                   name="name" placeholder="Create new group" autoComplete="off" onClick={() => {setSelectedInput([0, true])}}/>
                <button className={styles.new_group_check}>
                    {/* Check button for Create new group*/}
                    {selectedInput[0] === 0 && selectedInput[1] === true &&
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.5em">
                            <path fill="#464646" d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm4.71,7.71-5,5a1,1,0,0,1-1.42,0l-2-2a1,1,0,0,1,1.42-1.42L11,12.59l4.29-4.3a1,1,0,0,1,1.42,1.42Z"/>
                        </svg>
                    }
                </button>
            </form>

            {props.modalState.modalType === "editGroups" &&
                poppedGroup.map((group, i) => (
                            <div>
                                <p key={i} className={`no-select ${styles.modal_p}`}>
                                    <a onClick={() => {
                                        props.deleteGroup(group._id);
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.25em">
                                            <path fill="#464646" d="M21 6a1 1 0 0 1-1 1H4A1 1 0 0 1 4 5H9V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V5h5A1 1 0 0 1 21 6zM5.5 9v9.5A2.5 2.5 0 0 0 8 21h8a2.5 2.5 0 0 0 2.5-2.5V9zM11 17a1 1 0 0 1-2 0V13a1 1 0 0 1 2 0zm4 0a1 1 0 0 1-2 0V13a1 1 0 0 1 2 0z"/>
                                        </svg>
                                    </a>

                                    <input className={styles.edit_group_input} autoFocus={selectedInput[0] === (i)}
                                           name="name" value={group.name} autoComplete="off" onClick={() => {setSelectedInput([i, false])}}/>
                                        {selectedInput[0] === (i)
                                            ?
                                            <a>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.25em">
                                                    <path fill="#464646" d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm4.71,7.71-5,5a1,1,0,0,1-1.42,0l-2-2a1,1,0,0,1,1.42-1.42L11,12.59l4.29-4.3a1,1,0,0,1,1.42,1.42Z"/>
                                                </svg>
                                            </a>
                                            :
                                            <a>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.25em">
                                                    <path fill="#464646" d="M17,22H5a3,3,0,0,1-3-3V7A3,3,0,0,1,5,4H9A1,1,0,0,1,9,6H5A1,1,0,0,0,4,7V19a1,1,0,0,0,1,1H17a1,1,0,0,0,1-1V15a1,1,0,0,1,2,0v4A3,3,0,0,1,17,22Z"/>
                                                    <path fill="#464646" d="M14.6 5.87l-4.95 5a.41.41 0 0 0-.13.23l-1 3.82a.48.48 0 0 0 .13.48A.47.47 0 0 0 9 15.5a.32.32 0 0 0 .13 0l3.82-1a.41.41 0 0 0 .23-.13L18.13 9.4zM21 4.45L19.55 3a1.52 1.52 0 0 0-2.13 0L16 4.45 19.55 8 21 6.58A1.52 1.52 0 0 0 21 4.45z"/>
                                                </svg>
                                            ️</a>
                                            }
                                </p>
                            </div>
                ))
            }

            <button onClick={props.closeModal} style={{alignSelf: "flex-end"}}>Done</button>
        </Modal>

    );
}

export default GroupsModal;