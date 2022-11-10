import React, { useState } from "react";
import women from "../assets/women.png";
import { useWindowSize } from "../hooks/useWindowSize";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import * as services from "../services/functions";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Login } from "../pages/Login";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
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

function Carousel3({ props }: IMyProps) {
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  function onClick(evt: Event, item: any) {
    navigate(`/detail/${item[0].code}`, { state: item[0] });
  }
  async function handleClick(evt: any, item: any) {
    let answer = await services.addFav(evt, item);
    if (answer === "") {
      handleOpen();
    }
  }
  return (
    <div className="Card2_container">
      <div className="Card2_imgcontainer">
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Login close={handleClose} />
          </Box>
        </Modal>
        <AiOutlineHeart
          onClick={(evt: any) => handleClick(evt, [props.item])}
          className="ITEM_heart2"
        />
        <img
          className="Card2_imgs"
          alt="Not Found"
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
export { Carousel3, Item };
