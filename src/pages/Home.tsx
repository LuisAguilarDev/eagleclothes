import React from "react";
import Navigation from "./../components/Navigation";
import Bg from "../assets/bg.png";
import Footer from "../components/Footer";
import Carrousel from "../components/Carrousel";
import { Carousel2 } from "../components/Carrousel2";
import { Carousel3 } from "../components/Carrousel3";
import { Carousel1 } from "../components/Carrousel1";
import { Text1 } from "../components/text1";
import { Link } from "react-router-dom";

export default () => {
  return (
    <>
      <Navigation />
      <div>
        <img className="Navigation_bg" src={Bg} alt="Not Found" />
      </div>
      <Text1 />
      <Carousel1 />
      <Carousel2 />
      <Carousel3 />
      <Footer />
    </>
  );
};
