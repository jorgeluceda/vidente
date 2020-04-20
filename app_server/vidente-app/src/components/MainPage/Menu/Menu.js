import React, { useState } from 'react';

import styles from './Menu.module.css';

import MenuHeader from "./MenuHeader/MenuHeader";
import MenuContents from "./MenuContents/MenuContents";
import Modal from 'react-modal';
import { userService } from '../../../_services/userService';
const newGroupModalStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
    }
};

Modal.setAppElement('#root');

function Menu(props) {

    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }  

    const [newGroup, setNewGroup] = useState(undefined);

    const onSubmit = data => console.log(data);
  
    return(
        <>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} 
                style={newGroupModalStyles} contentLabel="Example Modal"> 
                <h5>Edit Groups</h5>
                <h5>&nbsp;</h5>

                <form onSubmit={(e) => { 
                    e.preventDefault();
                    const {emoji, name} = e.target;
                    if(emoji.value != ""  && name.value != "") {
                        var emojiRegex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g

                        if(emoji.value.match(emojiRegex)) {
                            userService.createGroup(emoji.value, name.value).then(() => {
                                props.addNewGroup({name: name.value, emoji: emoji.value});
                            });
                        } else {
                            console.log("Invalid emoji given");
                        }
                    } else {
                        console.log("Not going to do anything...");
                    }
                }}>
                    <input name="emoji" style={{width: "1.25em"}} type="text" placeholder="💡"/>
                    <input name="name" placeholder="Create New Group"/>
                    <button style={{width: "1em"}}>y</button>
                </form>

                {props.groups.map((group, i) => (
                    <p className="no-select">
                        <a className={styles.group}> 
                        {group.emoji} &nbsp; {group.name} </a>
                    </p>  
                ))}

                <button onClick={closeModal}>Done</button>
            </Modal>

            <MenuHeader openModal={openModal}></MenuHeader>
            <MenuContents groups={props.groups}></MenuContents>
        </>
    );

}

export default Menu;