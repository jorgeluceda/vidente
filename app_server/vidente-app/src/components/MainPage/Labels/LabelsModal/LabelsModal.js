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

// SKU Regex for label accepting strings that have at least one letter,
// there can't be more than 3 letters or more than 5 numbers
// to allow for faster indexing
const skuRegex = /^[a-zA-Z]{1,3}[0-9]{1,5}/mi

function LabelsModal(props) {
    const {register, watch, errors, handleSubmit} = useForm({
        mode: "onChange"
    });

    const [labelData, setLabelData] = useState();
    const onSubmit = data => {
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
                                <input className={styles.new_label_input} ref={register({
                                    validate: value => value.length < 9
                                })}
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
                {errors.labelName ?
                    <div className={styles.error_div}>
                        <svg className={styles.error_svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={"1em"}>
                            <path d="M21.74,18.51,14.16,3.33a2.42,2.42,0,0,0-4.32,0L2.26,18.51A2.4,2.4,0,0,0,4.41,22H19.59a2.4,2.4,0,0,0,2.15-3.49ZM12,17a1,1,0,1,1,1-1A1,1,0,0,1,12,17Zm1-5a1,1,0,0,1-2,0V9a1,1,0,0,1,2,0Z"/>
                        </svg>
                        &nbsp; 9 characters maximum allowed
                    </div>
                    :
                    <span style={{alignSelf: "flex-end", marginRight: "1em"}}>&nbsp;</span>
                }

                {/*<div className={styles.label_section}>*/}
                {/*    <span className={styles.label_section_name}><strong>Label Type</strong></span>*/}

                {/*    <input className={styles.new_label_input} ref={register}*/}
                {/*           name="labelType" placeholder="Type of Label" autoComplete="off"/>*/}
                {/*</div>*/}

                <div className={styles.label_section}>
                    <span className={styles.label_section_name}><strong>SKU</strong></span>

                    <input className={styles.new_label_input} ref={register({
                        validate: value => skuRegex.test(value)

                    })} name="labelSku" placeholder="SKU Value" autoComplete="off"/>
                </div>

                {errors.labelSku ?
                    <div className={styles.error_div}>
                        <svg className={styles.error_svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={"1em"}>
                            <path d="M21.74,18.51,14.16,3.33a2.42,2.42,0,0,0-4.32,0L2.26,18.51A2.4,2.4,0,0,0,4.41,22H19.59a2.4,2.4,0,0,0,2.15-3.49ZM12,17a1,1,0,1,1,1-1A1,1,0,0,1,12,17Zm1-5a1,1,0,0,1-2,0V9a1,1,0,0,1,2,0Z"/>
                        </svg>
                        &nbsp;Need at least a letter and a number
                    </div>
                    :
                    <span style={{alignSelf: "flex-end", marginRight: "1em"}}>&nbsp;</span>
                }

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