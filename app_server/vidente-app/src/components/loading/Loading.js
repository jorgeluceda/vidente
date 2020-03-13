import React, {useEffect, useState} from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import * as loadingAnimation from "./loadingAnimation";
import * as doneAnimation from "./doneAnimation";
import Header from "../header/Header";
import MenuHeader from "../menu-header/MenuHeader";
import Menu from "../menu/Menu";
import ContentsGrid from "../contents-grid/ContentsGrid";
import Headline from "../headline/Headline";
import Footer from "../footer/Footer";

const loadingAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingAnimation.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
}

const doneAnimationOptions = {
  loop: false,
  autoplay: true,
  animationData: doneAnimation.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

function Loading() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [users, setUsers] = useState({});
  // let response;
  useEffect(() => {
      setTimeout(() => {
        fetch("/api/users")
          .then(response => response.json())
          .then(json => {
            setLoading(true);
            setUsers(json)
            setTimeout(() => {
              setDone(true);
            }, 1200);
          })
      }, 1200);
    }, []);

  return(
    <div>
      {!done ? (
        <FadeIn>
          <div style={{display: "flex", alignItems: "center", flexDirection: "column",
            justifyContent: "center", height: "100vh",
            backgroundColor: "#F6F8FA "}}>
            {!loading ? (
              <Lottie options={loadingAnimationOptions} height={"12.5rem"} width={"20rem"} style={{margin: 0}} />
            ) : (
              <Lottie options={doneAnimationOptions} height={"12.5rem"} width={"20rem"} style={{margin: 0}} />
            )}
            <h2 style={{fontSize: "2rem", padding: 0, margin: 0, whiteSpace: "nowrap"}}>Fetching User</h2>

          </div>
        </FadeIn>

      ): (
        <div className="grid-page">
          <Header>
          </Header>
          <MenuHeader/>
          <Menu/>
          <Headline/>
          <ContentsGrid/>
          <Footer/>
        </div>

      )}
    </div>
  )

}

export default Loading;