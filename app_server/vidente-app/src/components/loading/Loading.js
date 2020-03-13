import React, {useEffect, useState} from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import * as loadingAnimation from "./loadingAnimation";
import * as doneAnimation from "./doneAnimation";

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

  // let response;
  useEffect(() => {
      setTimeout(() => {
        fetch("/api/users")
          .then(response => response.json())
          .then(json => {
            setLoading(true);

            setTimeout(() => {
              setDone(true);
            }, 1200);
          });
      }, 1200);

    }
  );
  // alert("Done was set to" + done);

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
        <div style={{display: "flex", alignItems: "center",
          justifyContent: "center", height: "100vh",
          backgroundColor: "#343434"}}>
          <h2 style={{height: "4.5rem", color: "white"}}>hello world</h2>
        </div>
      )}
    </div>
  )

}

export default Loading;