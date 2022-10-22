import React, { useState } from "react";
import { data } from "../data/data";
import men from "../assets/men.png";
import Card from "./Card";
import rigth from "../assets/rigth.svg";
import useRecursiveTimeout from "../hooks/useRecursiveTimeout";

export default () => {
  const [index, setIndex] = useState(0);
  const [indexN, setIndexN] = useState(1);

  useRecursiveTimeout(next, 4000);

  function previous() {
    if (index === 0) {
      setIndex(data.results.length);
      setIndexN(0);
      return;
    }
    setIndex(index - 1);
  }
  function next() {
    if (index === data.results.length - 2) {
      setIndex(data.results.length - 1);
      setIndexN(0);
      console.log(index, indexN, data.results.length);
      return;
    }
    if (index === data.results.length - 1) {
      setIndex(0);
      setIndexN(1);
      console.log(index, indexN, data.results.length);
      return;
    }
    setIndex(index + 1);
    setIndexN(indexN + 1);
    console.log(index, indexN, data.results.length);
  }
  return (
    <div className="Carrousel_maincontainer">
      <div className="Carrousel_imgcontainer">
        <img src={men} />
      </div>
      <div className="Carrousel_container">
        <div className="Carrousel_letters">
          <div>
            <span className="yellow">EAGLE</span>
            <span className="black">PROMOTIONS FOR MEN</span>
          </div>
          <button className="button_View">VIEW ALL</button>
        </div>

        <div className="Carrousel_imgsContainer">
          <div className="Carrousel_ButtonR">
            <img onClick={next} src={rigth} />
          </div>
          <Card props={data.results[index]} />
          <Card props={data.results[indexN]} />
        </div>
      </div>
    </div>
  );
};
