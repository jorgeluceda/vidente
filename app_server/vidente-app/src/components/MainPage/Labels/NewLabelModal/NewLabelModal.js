import Modal from "react-modal";
import React, {useState} from "react";
import styles from "./NewLabelModal.module.css";

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

function NewLabelModal(props) {
    const {register, watch, errors, handleSubmit} = useForm({
        mode: "onChange",
        defaultValues: {
            labelType: "CODE128"
        }
    });

    let labelState = {name: watch('labelName'), sku: watch('labelSku'), type: watch('labelType')}

    let labelOptions = {
        format: labelState.type,
        lineColor: "black",
        width: 2, height: 100,
        font: "Helvetica",
        displayValue: true,
        textPosition: "bottom"
    };

    const onSubmit = data => {
        userService.createLabel(props.currentGroup.name, props.currentGroup._id,
            data.labelName, data.labelSku, data.labelType).then(
            () => {
                props.closeModal();
            }
        );
    }

    return(
        <Modal isOpen={props.modalState.isOpen} onRequestClose={() => {
            props.onRequestClose();
        }} style={newLabelsModalStyles} contentLabel="New Label Modal">
            <form className={styles.modal_form} onSubmit={handleSubmit(onSubmit)}>
                <div className={`no-select ${styles.label_title}`}>
                    <>
                        <h5>New Label in {props.currentGroup.name}</h5>
                        <h5 className={`no-select`}>&nbsp;</h5>
                        <div className={styles.label_section}>
                            <span className={styles.label_section_name}><strong>Name</strong></span>
                            <input className={styles.new_label_input} ref={register({
                                validate: value => value.length < 21
                            })} name="labelName" placeholder="Label Name" autoComplete="off" minLength="1"/>
                        </div>
                    </>
                </div>
                {errors.labelName ?
                    <div className={styles.error_div}>
                        <svg className={styles.error_svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={"1em"}>
                            <path d="M21.74,18.51,14.16,3.33a2.42,2.42,0,0,0-4.32,0L2.26,18.51A2.4,2.4,0,0,0,4.41,22H19.59a2.4,2.4,0,0,0,2.15-3.49ZM12,17a1,1,0,1,1,1-1A1,1,0,0,1,12,17Zm1-5a1,1,0,0,1-2,0V9a1,1,0,0,1,2,0Z"/>
                        </svg>
                        &nbsp; 20 characters maximum allowed
                    </div>
                    :
                    <span className={styles.error_div}>&nbsp;</span>
                }

                <div className={styles.label_section}>
                    <span className={styles.label_section_name}><strong>SKU</strong></span>

                    <input className={styles.new_label_input} ref={register({
                        validate: value => skuRegex.test(value)

                    })} name="labelSku" placeholder="SKU Value" autoComplete="off" maxLength={6}/>
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

                <div className={styles.label_section}>
                    <span className={styles.label_section_name}><strong>Type</strong></span>
                    <select name="labelType" ref={register}>
                        <option value="CODE39">CODE39</option>
                        <option value="CODE128">CODE128</option>
                    </select>
                </div>

                <span className={styles.error_div}>&nbsp;</span>

                <div style={{height: "10em", display: 'flex', alignSelf: "center"}}>
                {(labelState.name !== undefined && labelState.sku !== undefined && labelState.type !== undefined &&
                    labelState.name.length > 0 && labelState.sku.length > 0) ?
                        <div className={styles.card} style={{background: "white"}}>
                            <b>{watch('labelName')}</b>
                            <Barcode text={watch('labelSku')} value={watch('labelSku')} {...labelOptions}/>
                        </div>
                    :
                    <div className={styles.add_label_card} id="add-label">
                        <div className={`no-select ${styles.add_label_card_span}`} >
                            Complete the fields above to visualize the label
                        </div>
                    </div>

                }
                </div>

                <div className={styles.modal_border}/>
                <input className={styles.submit_button} style={{alignSelf: "center"}} type="submit"/>

            </form>
        </Modal>
    );
}

export default NewLabelModal;