import React from "react";
import "./landing.scss";
import { plane } from "../../assets/images";

export default function () {
  return (
    <>
      <div className="landing_home">
        <img src={plane} alt="plane" />
        <h1>&lt;Code hunt/&gt;</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat tempore nam consequuntur fuga in similique optio. Lorem ipsum dolor sit amet.</p>
        <button>Lets Get going</button>
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
