import React, { useState } from "react";
import { data } from "../data/data";
import women from "../assets/women.png";
import { useWindowSize } from "../hooks/useWindowSize";
import Carousel from "react-material-ui-carousel";

function Carousel3(props: any) {
  const size = useWindowSize();
  return (
    <div className="Carousel3_container">
      <div className="Carousel2_img_container">
        <img className="Carousel2_img_men" src={women} />
      </div>
      <div className="Carousel2_container2">
        <div className="Carrousel_letters">
          <div>
            <span className="yellow">EAGLE</span>
            <span className="black">TOP SELLINGS FOR HER</span>
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
          {data?.results
            ?.map((item, i, array) => {
              if (array[i + 1]) {
                return (
                  <div className="Card2_cardscontainer">
                    <Item key={i} item={array[i]} />
                    <Item key={i + 1} item={array[i + 1]} />
                  </div>
                );
              }
            })
            .splice(0, data?.results.length - 3)}
        </Carousel>
      </div>
    </div>
  );
}

function Item(props: any) {
  return (
    <div className="Card2_container">
      <div className="Card2_imgcontainer">
        <img className="Card2_imgs" alt="45" src={props.item.images[0].url} />
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
export { Carousel3, Item };
