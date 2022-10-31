import React from "react";
import Carousel from "react-material-ui-carousel";
import { useWindowSize } from "../hooks/useWindowSize";
import { useState, useEffect } from "react";
import axios from "axios";
import { productType } from "../reducer/Types";
import { Item } from "./Item1";
interface IMyProps {
  props: productType[];
}

const Carousel1 = ({ props }: IMyProps) => {
  const size = useWindowSize();
  return (
    <Carousel
      sx={{
        height: 600,
      }}
      navButtonsProps={{
        style: {
          background: "white",
          color: "black",
          width: "64px",
          height: "64px",
          fontSize: "21px !important",
        },
        className: "buttonsvg",
      }}
      interval={4000}
      swipe={true}
      navButtonsAlwaysVisible={true}
      indicators={false}
      animation="fade"
    >
      {/* {size.width > 1366?  */}
      {props?.map((item: productType, i: number, array: productType[]) => {
        if (array[i + 2]) {
          return (
            <div key={i} className="Card1_cardscontainer">
              <Item key={i} item={array[i]} />
              <Item key={i + 1} item={array[i + 1]} />
              <Item key={i + 2} item={array[i + 2]} />
            </div>
          );
        }
        if (i === props.length - 2) {
          return (
            <div key={i} className="Card1_cardscontainer">
              <Item key={i} item={array[i]} />
              <Item key={i + 1} item={array[7]} />
              <Item key={i + 2} item={array[0]} />
            </div>
          );
        }
        if (i === props.length - 1) {
          return (
            <div key={i} className="Card1_cardscontainer">
              <Item key={i} item={array[7]} />
              <Item key={i + 1} item={array[0]} />
              <Item key={i + 2} item={array[1]} />
            </div>
          );
        }
      })}
    </Carousel>
  );
};

export { Carousel1 };
