import React from "react";
import Footer from "../components/Footer";
import { Carousel2 } from "../components/Carrousel2";
import { Carousel3 } from "../components/Carrousel3";
import { Carousel1 } from "../components/Carrousel1";
import { Text1 } from "../components/Text1";

export default ({ props1, props3, props2 }: any) => {
  return (
    <div className="view100vw">
      <Text1 />
      <Carousel1 props={props1} />
      <Carousel2 props={props2} />
      <Carousel3 props={props3} />
      <Footer />
    </div>
  );
};
