import React from "react";
import Bg from "../assets/bg.png";

export function Text1() {
  return (
    <>
      <div>
        <img className="Navigation_bg" src={Bg} alt="Not Found" />
      </div>
      <div className="Carousel1_text">
        <span className="yellow">NEW</span>
        <span className="black">COLLECTION</span>
      </div>
    </>
  );
}
