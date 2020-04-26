import Modal from "react-modal";
import React, {useState} from "react";
import styles from "./EditLabelModal.module.css";

import { useForm } from "react-hook-form";

import { userService} from "../../../../_services/userService";
import Barcode from "react-barcode";

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
const skuRegex = /^[A-Z]{1,3}[0-9]{1,5}/m

function EditLabelModal(props) {

    const {register, watch, errors, handleSubmit} = useForm({
        mode: "onChange",
        defaultValues: {
            labelName: props.currentLabel.name,
            labelSku: props.currentLabel.sku
        }
    });

    let labelState = {name: watch('labelName'), sku: watch('labelSku')}

    let labelOptions = {
        format: "CODE39",
        lineColor: "black",
        width: 2, height: 100,
        font: "Helvetica",
        displayValue: true,
        textPosition: "bottom"
    };

    const onSubmit = data => {
        userService.updateLabel(props.currentGroup._id, props.currentLabel._id,
            data.labelName, data.labelSku).then(() =>
            {
                props.closeModal();
            }
        );
    }

    const deleteLabel = () =>  {
        userService.deleteLabel(props.currentGroup._id, props.currentLabel._id).then(() => {
            props.closeModal();
        })
    }

    return(
        <Modal isOpen={props.modalState.isOpen} onRequestClose={() => {
            props.closeModal();
        }} style={newLabelsModalStyles} contentLabel="New Label Modal">
            <form className={styles.modal_form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.delete_button} onClick={() => {
                    deleteLabel();
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.75em">
                        <path fill="#F54239" d="M21 6a1 1 0 0 1-1 1H4A1 1 0 0 1 4 5H9V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V5h5A1 1 0 0 1 21 6zM5.5 9v9.5A2.5 2.5 0 0 0 8 21h8a2.5 2.5 0 0 0 2.5-2.5V9zM11 17a1 1 0 0 1-2 0V13a1 1 0 0 1 2 0zm4 0a1 1 0 0 1-2 0V13a1 1 0 0 1 2 0z"/>
                    </svg>
                </div>

                <div className={`no-select ${styles.label_title}`}>
                    <>
                        <h5>Edit Labels
                        </h5>
                    </>
                </div>
                <h5 className={`no-select`}>&nbsp;</h5>


                <div className={styles.label_section}>
                    <span className={styles.label_section_name}><strong>Name</strong></span>

                    <input className={styles.new_label_input} ref={register({
                        validate: value => value.length >= 3

                    })} name="labelName" autoComplete="off" maxLength={20}/>
                </div>

                {errors.labelName ?
                    <div className={styles.error_div}>
                        <svg className={styles.error_svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={"1em"}>
                            <path d="M21.74,18.51,14.16,3.33a2.42,2.42,0,0,0-4.32,0L2.26,18.51A2.4,2.4,0,0,0,4.41,22H19.59a2.4,2.4,0,0,0,2.15-3.49ZM12,17a1,1,0,1,1,1-1A1,1,0,0,1,12,17Zm1-5a1,1,0,0,1-2,0V9a1,1,0,0,1,2,0Z"/>
                        </svg>
                        &nbsp; Needs at least 3 characters
                    </div>
                    :
                    <></>
                    // <span className={styles.error_div}>&nbsp;</span>
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

                    })} name="labelSku" autoComplete="off" maxLength={6}/>
                </div>

                {errors.labelSku ?
                    <div className={styles.error_div}>
                        <svg className={styles.error_svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={"1em"}>
                            <path d="M21.74,18.51,14.16,3.33a2.42,2.42,0,0,0-4.32,0L2.26,18.51A2.4,2.4,0,0,0,4.41,22H19.59a2.4,2.4,0,0,0,2.15-3.49ZM12,17a1,1,0,1,1,1-1A1,1,0,0,1,12,17Zm1-5a1,1,0,0,1-2,0V9a1,1,0,0,1,2,0Z"/>
                        </svg>
                        &nbsp;Enter at least a capital letter and a number
                    </div>
                    :
                    <span className={styles.error_div}>&nbsp;</span>
                }



                {/* Date Created would go here on editLabel */}
                <div style={{height: "10em", display: 'flex', alignSelf: "center"}}>
                    <div className={styles.card} style={{background: "white"}}>
                        <b>{watch('labelName')}</b>
                        <Barcode text={watch('labelSku')} value={watch('labelSku')} {...labelOptions}/>
                    </div>
                    {/*:*/}
                    {/*<div className={styles.add_label_card} id="add-label">*/}
                    {/*    <div className={`no-select ${styles.add_label_card_span}`} >*/}
                    {/*        Complete the fields above to visualize the label*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>

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

export default EditLabelModal;