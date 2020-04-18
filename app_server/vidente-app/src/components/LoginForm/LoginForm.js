import React from 'react';
import { useForm} from 'react-hook-form';

import {authService} from "../../_services/authService";

function LoginForm(props) {
    const {register, handleSubmit} = useForm();
  
    const onSubmit = user => {
      authService.login(user.email, user.password).then((
        x => props.changeLoginStatus(x, false)));
    };
  
    return(
      <div style={{display: "flex", alignItems: "center", flexDirection: "column",
      justifyContent: "center", height: "100vh",
      backgroundColor: "#F6F8FA "}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Email</label>
          <input ref={register} name="email"/>
    
          <label>Password</label>
          <input ref={register} name="password"/>
    
          <button>Submit</button>
        </form>
      </div>
    );
  }

  export default LoginForm;