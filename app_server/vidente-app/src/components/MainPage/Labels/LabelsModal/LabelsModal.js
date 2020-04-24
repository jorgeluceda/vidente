import Modal from "react-modal";
import React, {useState} from "react";
import styles from "./LabelsModal.module.css";

import { useForm } from "react-hook-form";

import { userService} from "../../../../_services/userService";

Modal.setAppElement('#root');

const newLabelsModalStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        display: "flex",
        flexDirection: "column"
    },
};

function LabelsModal(props) {
    const {register, watch, errors, handleSubmit} = useForm();

    const [labelData, setLabelData] = useState();
    const onSubmit = data => {
        alert(`group Name: ${props.currentGroup.name}, groupId: ${props.currentGroup.id}`)
        userService.createLabel(props.currentGroup.name, props.currentGroup.id, data.labelName, data.labelSku).then(
            (json) => {
                setLabelData(data);
                props.closeModal();
            }
        );
    }

    console.log(watch('labelSku'));

    return(
        <Modal isOpen={props.modalState.isOpen} onRequestClose={() => {
            props.onRequestClose();
        }} style={newLabelsModalStyles} contentLabel="Example Modal">
            <form className={styles.modal_form} onSubmit={handleSubmit(onSubmit)}>
                <div className={`no-select ${styles.label_title}`}>
                    {props.modalState.modalType === "newLabel"
                        ?
                        <>
                            <h5>New Label in {props.currentGroup.name}</h5>
                            <h5 className={`no-select`}>&nbsp;</h5>
                            <div className={styles.label_section}>
                                <span className={styles.label_section_name}><strong>Title</strong></span>
                                <input className={styles.new_label_input} ref={register} autoFocus={true}
                                       name="labelName" placeholder="Label Title" autoComplete="off"/>
                            </div>
                        </>
                        :
                        <>
                            <h5>Edit Labels</h5>
                            <h5 className={`no-select`}>&nbsp;</h5>
                        </>
                    }
                </div>

                {/*<div className={styles.label_section}>*/}
                {/*    <span className={styles.label_section_name}><strong>Label Type</strong></span>*/}

                {/*    <input className={styles.new_label_input} ref={register}*/}
                {/*           name="labelType" placeholder="Type of Label" autoComplete="off"/>*/}
                {/*</div>*/}

                <div className={styles.label_section}>
                    <span className={styles.label_section_name}><strong>SKU</strong></span>

                    <input className={styles.new_label_input} ref={register}
                           name="labelSku" placeholder="SKU Value" autoComplete="off"/>
                </div>

                {/* Date Created would go here on editLabel */}
                <div className={styles.modal_border}/>

                {props.modalState.modalType === "newLabel"
                    ?
                    <input className={styles.done_button} style={{alignSelf: "center"}} type="submit"/>
                    :
                    <input className={styles.done_button} type="submit"/>
                }
            </form>
        </Modal>
    );
}

export default LabelsModal;