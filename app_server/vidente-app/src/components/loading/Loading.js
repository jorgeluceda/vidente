import React, {useEffect, useState} from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import * as loadingAnimation from "./loadingAnimation";
import * as doneAnimation from "./doneAnimation";

import GridPage from "../grid-page/GridPage";
// import Header from "../grid-page/header/Header";
import MenuHeader from "../grid-page/menu-header/MenuHeader";
import Menu from "../grid-page/menu/Menu";
import ContentsGrid from "../grid-page/contents-grid/ContentsGrid";
import Headline from "../grid-page/headline/Headline";
import Footer from "../grid-page/footer/Footer";

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

  useEffect(() => {
        fetch("/api/users")
          .then(response => response.json())
          .then(json => {
            setLoading(true);
            setUsers(json);
            setTimeout(() => {
              setDone(true);
            }, 550);
          })
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
        <GridPage></GridPage>

      )}
    </div>
  )

}

export default Loading;