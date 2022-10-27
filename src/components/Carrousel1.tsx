import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { useWindowSize } from "../hooks/useWindowSize";
import { useReducer } from "react";
import { useState, useEffect } from "react";
import { INITIAL_STATE, postReducer } from "../reducer/reducerConfig";
import axios from "axios";

export interface product {
  category: String;
  code: String;
  name: String;
  pk: Number;
  price: {
    value: Number;
    formattedValue: String;
  };
  variantSizes: [{ filtercode: String }];
  color: [String];
  colorName: [String];
  galleryImages: [{ url: String }];
  images: String;
}

interface IMyProps {
  props: product[];
}

// type Props = {
//   product: product[];
//   children: React.ReactNode;
// };

const Carousel1 = ({ props }: IMyProps) => {
  const size = useWindowSize();
  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);

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
      {props
        ?.map((item: product, i: number, array: product[]) => {
          if (array[i + 2]) {
            return (
              <div key={i} className="Card1_cardscontainer">
                <Item key={i} item={array[i]} />
                <Item key={i + 1} item={array[i + 1]} />
                <Item key={i + 2} item={array[i + 2]} />
              </div>
            );
          }
          {
          }
        })
        .splice(0, props?.length - 3)}
    </Carousel>
  );
};

function Item(props: any) {
  return props.item?.images && props?.item ? (
    <div key={props.item.code}>
      <div className="Card1_container">
        <div className="Card1_imgcontainer">
          <img
            className="Card1_imgs"
            alt="Not Found"
            src={props.item.galleryImages[0].url}
          />
        </div>
        <div className="Card1_textcontainer">
          <h2 className="Card1_text">{props.item.name}</h2>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
export { Carousel1, Item };
