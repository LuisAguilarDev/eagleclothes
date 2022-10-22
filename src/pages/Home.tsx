import React from "react";
import Navigation from "./../components/Navigation";
import Bg from "../assets/bg.png";
import Footer from "../components/Footer";
import Carrousel from "../components/Carrousel";
import Carrousel2 from "../components/Carrousel2";
import Carrousel3 from "../components/Carrousel3";

export default () => {
  return (
    <>
      <Navigation />
      <div>
        <img className="Navigation_bg" src={Bg} alt="Not Found" />
      </div>
      <Carrousel3 />
      <Carrousel />
      <Carrousel2 />
      <Footer />
    </>
  );
};
