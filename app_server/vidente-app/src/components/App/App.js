import React, { useEffect, useState} from 'react';

import {authService} from "../../_services/authService";

import MainPage from '../MainPage/MainPage';
import LoginForm from '../LoginForm/LoginForm';

import FadeIn from "react-fade-in";

function App() {
  const [shouldLogin, setShouldLogin] = useState(false);
  const [userToken, setUserToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);


  useEffect(() => {
    if(!userToken) {
      const currentUser = authService.currentUserValue;

      if(currentUser) {
        authService.currentUser.subscribe(x => {
          setUserToken(x);
        });
      } else {
        setShouldLogin(true);
      }
    } else {

    }
  }, []);

  const changeLoginStatus = (token, showLogin) => {
    setUserToken(token);
    setShouldLogin(showLogin);
  }

  return (
    <>
      {!shouldLogin && !userToken ? (
        <>
        </>
      ) :
        <>
          {shouldLogin ? (
            <FadeIn>
              <LoginForm changeLoginStatus={changeLoginStatus}></LoginForm>
            </FadeIn>
          ) :
            <MainPage changeLoginStatus={changeLoginStatus}> </MainPage>
          }
        </>
      }
    </>
  );
}

export default App;
