import React from "react";
import "./landing.scss";
import { plane } from "../../assets/images";

export default function Landing() {
  return (
    <>
      <div className="landing">
        <img className="landing__img" src={plane} alt="plane" />
        <h1 className="landing__title">&lt;Code hunt/&gt;</h1>
        <p className="landing__desc">Lorem ispum doler emmut sit, Lorem ispum doler emmut sit, ispum doler emmut sit, ispum doler emmut sit, ispum doler emmut sit,</p>
        <a className="btn landing__btn" href="/problem-statement">Lets Get going</a>
      {/* <div className="parent">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div> */}
      </div>
    </>
  );
}
