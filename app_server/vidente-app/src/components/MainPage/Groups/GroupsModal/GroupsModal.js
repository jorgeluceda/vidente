import Modal from "react-modal";
import React from "react";
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
    alert("hello");
    //remove 'edit groups' group from prop
    var poppedGroup = props.groups.slice(0, -1);
    return(
        <Modal isOpen={props.modalState.isOpen} onRequestClose={props.onRequestClose}
               style={newGroupModalStyles} contentLabel="Example Modal">
            {props.modalState.modalType === "newModal"
                ? <h5>Create New Group</h5>
                : <h5>Edit Groups</h5>
            }
            <h5>&nbsp;</h5>

            <form onSubmit={(e) => {
                e.preventDefault();
                const {emoji, name} = e.target;
                if(name.value != "") {
                    userService.createGroup(name.value).then(() => {
                        props.addNewGroup({name: name.value});
                    });
                } else {
                    console.log("Not going to do anything...");
                }
            }}>
                <a className={`${styles.newgroup_cancel}`}>🚫</a>
                <input style={{fontSize: "1.125em", borderRadius: "0em", borderWidth: "0em", minWidth: "3em", textAlign: "center", outline: "0"}} autoFocus={true}
                       name="name" placeholder="Create new group" autoComplete="off"/>
                <button style={{borderWidth: "0em", width: "1em", fontSize: "1em", backgroundColor: "transparent", marginRight: "1em"}}>✅</button>
            </form>

            <h6>&nbsp;</h6>
            {props.modalState.modalType === "editGroups" &&
                poppedGroup.map((group, i) => (
                            <p key={i} className={`no-select ${styles.modal_p}`}>
                                <a style={{}} onClick={() => {
                                    alert(`Tried to delete ${group.name}`);
                                }}>
                                    🗑️&nbsp;&nbsp;
                               ️</a>
                                <span style={{display: "inline-block", minWidth: "11.75em", maxWidth: "10em"}}>
                            {group.name} </span>
                                <a>🖊️</a>
                            </p>
                ))
            }

            <div style={{display: "flex", marginBottom: "1em", borderBottom: "1px solid #e1e4e8!important", width: "13rem"}}>&nbsp;</div>

            <button onClick={props.closeModal} style={{alignSelf: "flex-end"}}>Done</button>
        </Modal>

    );
}

export default GroupsModal;