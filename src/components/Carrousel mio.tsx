import React, { useState } from "react";
import { data } from "../data/data";
import women from "../assets/women.png";
import Card from "./Card";
import left from "../assets/left.svg";
import useRecursiveTimeout from "../hooks/useRecursiveTimeout";

export default () => {
  const [index, setIndex] = useState(0);
  const [indexN, setIndexN] = useState(1);

  useRecursiveTimeout(next, 4000);

  function previous() {
    if (index === 0) {
      setIndex(data.results.length - 1);
      setIndexN(0);
      return;
    }
    if (index === data.results.length - 1) {
      setIndex(data.results.length - 2);
      setIndexN(data.results.length - 1);
      return;
    }
    setIndex(index - 1);
    setIndexN(indexN - 1);
  }
  function next() {
    if (index === data.results.length - 2) {
      setIndex(data.results.length - 1);
      setIndexN(0);
      return;
    }
    if (index === data.results.length - 1) {
      setIndex(0);
      setIndexN(1);
      return;
    }
    setIndex(index + 1);
    setIndexN(indexN + 1);
  }
  return (
    <div className="Carrousel_maincontainer">
      <div className="Carrousel_container">
        <div className="Carrousel_letters">
          <div>
            <span className="yellow">EAGLE</span>
            <span className="black">PROMOTIONS FOR MEN</span>
          </div>
          <button className="button_View">VIEW ALL</button>
        </div>
        <div className="Carrousel_imgsContainer">
          <div className="Carrousel_ButtonL">
            <img onClick={previous} src={left} />
          </div>
          <Card props={data.results[index]} />
          <Card props={data.results[indexN]} />
        </div>
      </div>
      <div className="Carrousel_imgcontainer">
        <img src={women} />
      </div>
    </div>
  );
};
