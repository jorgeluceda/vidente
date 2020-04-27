import React, {useState} from 'react';
import { useForm } from "react-hook-form";

import {authService} from "../../_services/authService";

import styles from "./LoginForm.module.css";

let emailRegex = /^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}/mi

function LoginForm(props) {
    const [formType, setFormType] = useState("login");
    const {register, errors, handleSubmit} = useForm({
        mode: "onChange"
    });

    const changeFormType = (val) => {
        setFormType(val);
    }

    const loginAsTestUser = () => {
        authService.login("test@test.com", "test").then((
            x => props.changeLoginStatus(x, false)));
    }

    const onSubmit = user => {
        if(formType === "login") {
            authService.login(user.email, user.password).then((
                x => props.changeLoginStatus(x, false)));
        }

        if(formType === "register") {
            authService.register(user.name, user.email, user.password).then((
                x => props.changeLoginStatus(x, false)));
        }
    };
  
    return(
        <div className={styles.login_page}>
            <div className={styles.card} style={{height: "21.5em"}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {formType === "register" &&
                            <div className={styles.form_section} style={{paddingTop: "0.5em"}}>
                                <label className={`${styles.large} no-select`}>Name</label>
                                <input className={styles.form_input} ref={register} name="name" autoFocus={true}
                                       placeholder="Enter Name"/>
                            </div>
                    }

                    {errors.email && formType === "register" ?
                        <div className={styles.error_div}>
                            <svg className={styles.error_svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={"1em"}>
                                <path d="M21.74,18.51,14.16,3.33a2.42,2.42,0,0,0-4.32,0L2.26,18.51A2.4,2.4,0,0,0,4.41,22H19.59a2.4,2.4,0,0,0,2.15-3.49ZM12,17a1,1,0,1,1,1-1A1,1,0,0,1,12,17Zm1-5a1,1,0,0,1-2,0V9a1,1,0,0,1,2,0Z"/>
                            </svg>
                            &nbsp; At least 5 characters required
                        </div>
                        :
                        <span className={styles.error_div}>&nbsp;</span>
                    }


                    <div className={styles.form_section} style={{paddingTop: "0.5em"}}>
                        <label className={`${styles.large} no-select`}>Email</label>
                        <input className={styles.form_input} ref={register({
                            validate: value => emailRegex.test(value)
                        })} name="email" autoFocus={true} placeholder="Enter e-mail"/>
                    </div>

                    {errors.email ?
                        <div className={styles.error_div}>
                            <svg className={styles.error_svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={"1em"}>
                                <path d="M21.74,18.51,14.16,3.33a2.42,2.42,0,0,0-4.32,0L2.26,18.51A2.4,2.4,0,0,0,4.41,22H19.59a2.4,2.4,0,0,0,2.15-3.49ZM12,17a1,1,0,1,1,1-1A1,1,0,0,1,12,17Zm1-5a1,1,0,0,1-2,0V9a1,1,0,0,1,2,0Z"/>
                            </svg>
                            &nbsp; Please provide a valid email
                        </div>
                        :
                        <span className={styles.error_div}>&nbsp;</span>
                    }

                    <div className={styles.form_section}>
                        <label className={styles.large}>Password</label>
                        <input className={styles.form_input} ref={register({
                            validate: value => value.length >= 5
                        })} name="password" type="password" placeholder="Enter password"/>
                    </div>

                    {errors.password ?
                        <div className={styles.error_div}>
                            <svg className={styles.error_svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={"1em"}>
                                <path d="M21.74,18.51,14.16,3.33a2.42,2.42,0,0,0-4.32,0L2.26,18.51A2.4,2.4,0,0,0,4.41,22H19.59a2.4,2.4,0,0,0,2.15-3.49ZM12,17a1,1,0,1,1,1-1A1,1,0,0,1,12,17Zm1-5a1,1,0,0,1-2,0V9a1,1,0,0,1,2,0Z"/>
                            </svg>
                            &nbsp; At least 5 characters required
                        </div>
                        :
                        <span className={styles.error_div}>&nbsp;</span>
                    }


                    <div className={styles.form_options}>
                        {formType === "login" ?
                            (
                                <>
                                <div className={`${styles.create_button} no-select`} onClick={() => {
                                    changeFormType("register");
                                }}>Create Account</div>
                                <button className={`${styles.login_button} no-select`} type="submit"
                                    onClick={() => {

                                    }}>Login</button>
                                </>
                            )
                            :
                            (
                                <>
                                    <button className={`${styles.login_button} no-select`} type="submit"
                                    onClick={() => {

                                    }}>Register</button>
                                    <div className={`${styles.create_button} no-select`} style={{marginLeft: "1em"}}
                                    onClick={() => {
                                        changeFormType("login");
                                    }} >Back to Login</div>
                                </>
                            )
                        }
                    </div>
                </form>
            </div>

            <div className={styles.demo_section}>
                <h4 className={`${styles.larger} no-select`}>Want to demo <br/>Vidente instead?</h4>
                <button className={styles.light_button} onClick={loginAsTestUser}>Log in as Test User</button>
            </div>
        </div>
    );
  }

  export default LoginForm;