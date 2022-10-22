import React, { useState } from "react";
import { data } from "../data/data";
import women from "../assets/women.png";
import Card from "./Card";
import left from "../assets/left.svg";
import rigth from "../assets/rigth.svg";
import useRecursiveTimeout from "../hooks/useRecursiveTimeout";

export default () => {
  const [index, setIndex] = useState(0);
  const [indexN, setIndexN] = useState(1);
  const [indexNN, setIndexNN] = useState(2);

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
          <div className="Navigation_letters">
            <span className="yellow">NEW</span>
            <span className="blue">COLLECTION</span>
          </div>
        </div>
        <div className="Carrousel_imgsContainer">
          <div className="Carrousel_ButtonL">
            <img onClick={previous} src={left} />
          </div>
          <div className="Carrousel_ButtonR">
            <img onClick={next} src={rigth} />
          </div>
          <Card props={data.results[index]} />
          <Card props={data.results[indexN]} />
          <Card props={data.results[indexNN]} />
        </div>
      </div>
    </div>
  );
};
