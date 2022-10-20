import React from "react";
import Navigation from "./../components/Navigation";
import Bg from "../assets/bg.png";
import Footer from "../components/Footer";

export default () => {
  return (
    <>
      <Navigation />
      <div>
        <img className="Navigation_bg" src={Bg} alt="Not Found" />
      </div>
      <div className="Navigation_letters">
        <span className="yellow">NEW</span>
        <span className="blue">COLLECTION</span>
      </div>
      <div className="Navigation_carrousel">carrousel 1</div>
      <div className="Navigation_carrousel">carrousel 2</div>
      <div className="Navigation_carrousel">carrousel 3</div>
      <Footer />
    </>
  );
};
