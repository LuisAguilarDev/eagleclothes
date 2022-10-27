import React, { useState } from "react";
import { data } from "../data/data";
import men from "../assets/men.png";
import { useWindowSize } from "../hooks/useWindowSize";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";

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

function Carousel2({ props }: IMyProps) {
  const size = useWindowSize();
  return (
    <div className="Carousel2_container">
      <div className="Carousel2_img_container">
        <img className="Carousel2_img_men" src={men} />
      </div>
      <div className="Carousel2_container2">
        <div className="Carrousel_letters">
          <div>
            <span className="yellow">EAGLE</span>
            <span className="black">PROMOTIONS FOR MEN</span>
          </div>
          <button className="button_View">VIEW ALL</button>
        </div>
        <Carousel
          sx={{
            height: 600,
            width: "100%",
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
          {props?.map((item, i, array) => {
            if (array[i + 1]) {
              return (
                <div key={i} className="Card2_cardscontainer">
                  <Item key={i} item={array[i]} />
                  <Item key={i + 1} item={array[i + 1]} />
                </div>
              );
            }
            if (i === props.length - 1) {
              return (
                <div key={i} className="Card2_cardscontainer">
                  <Item key={i} item={array[7]} />
                  <Item key={i + 1} item={array[0]} />
                </div>
              );
            }
          })}
        </Carousel>
      </div>
    </div>
  );
}

function Item(props: any) {
  const navigate = useNavigate();
  function onClick(evt: Event, item: any) {
    console.log("entre", evt);
    console.log("producto=?", item);
    navigate(`/detail/${item[0].code}`, { state: item[0] });
  }

  return (
    <div className="Card2_container">
      <div className="Card2_imgcontainer">
        <img
          className="Card2_imgs"
          alt="45"
          src={props.item.galleryImages[0].url}
          onClick={(evt: any) => onClick(evt, [props.item])}
        />
      </div>
      <div className="Card2_textcontainer">
        <h2 className="Card2_text">{props.item.name}</h2>
      </div>
      <div className="Card2_discount">
        <span className="Card2_textd">{`$ ${
          Math.round(props.item.price.value * 1.2 * 100) / 100
        }`}</span>
        <span className="Card2_textn">{`$ ${
          Math.round(props.item.price.value * 100) / 100
        }`}</span>
      </div>
    </div>
  );
}
export { Carousel2, Item };
