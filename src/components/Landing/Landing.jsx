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
      <div className="timeline">
        <div className="timeline__title">&lt;Rewards/&gt;</div>
        <div className="timeline__points">
          <div className="point red">
            <span>1st Prize</span>
            <p>₹1500 /- Cash Prize + Certificate</p>
          </div>
          <div className="point yellow">
            <span>2nd Prize</span>
            <p>₹500 /- Cash Prize + Certificate</p>
          </div>
          <div className="point blue">
            <span>3rd Prize</span>
            <p>2nd Runner Up Certificate</p>
          </div>
          <div className="point green">
            <span>Participation</span>
            <p>All participants will get participation certificate</p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
