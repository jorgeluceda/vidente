import React, {useEffect, useState} from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import * as loadingAnimation from "./loadingAnimation";
import * as doneAnimation from "./doneAnimation";
import {authService} from "../_services/authService";

import MainPage from "../main-page/MainPage";
import {userService} from "../_services/userService";

const loadingAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingAnimation.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const doneAnimationOptions = {
  loop: false,
  autoplay: true,
  animationData: doneAnimation.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

function Loading() {
  const [shouldLogin, setShouldLogin] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState();
  const [internalError, setInternalError] = useState();

  const tokenCallback = (token) => {
    setUserToken(token);
    setShouldLogin(false);
  };

  useEffect(() => {
    if(!userToken) {
      const currentUser = authService.currentUserValue;

      if(!currentUser) {
        setShouldLogin(true);
      } else {
        authService.currentUser.subscribe(x => {
          setUserToken(x);
        });
      }
    } else {
      setTimeout(() => {
        setDone(true);
      }, 100);
      setTimeout(() => {
        setLoading(true);
      }, 800);
    }
  });

  return(
    <div>
      {!loading && !shouldLogin ? (
        <FadeIn>
            <div style={{display: "flex", alignItems: "center", flexDirection: "column",
            justifyContent: "center", height: "100vh",
            backgroundColor: "#F6F8FA "}}>
            {!done ? (
              <Lottie options={loadingAnimationOptions} height={"12.5rem"} width={"20rem"} style={{margin: 0}} />
            ) : (
              <Lottie options={doneAnimationOptions} height={"12.5rem"} width={"20rem"} style={{margin: 0}} />
            )}
            <h2 style={{fontSize: "2rem", padding: 0, margin: 0, whiteSpace: "nowrap"}}>Fetching User</h2>
          </div>
        </FadeIn>

      ): shouldLogin ? (
        <FadeIn>
          <div style={{display: "flex", alignItems: "center", flexDirection: "column",
            justifyContent: "center", height: "100vh",
            backgroundColor: "#F6F8FA "}}>
            <button onClick={() => {tokenCallback(authService.login("test@test.com", "test").then((x => setUserToken(x))));}}>
              Log in using Test User.
            </button>
          </div>
        </FadeIn>

      ) :
        <FadeIn>
          <MainPage />
        </FadeIn>
      }
    </div>
  )

}

export default Loading;