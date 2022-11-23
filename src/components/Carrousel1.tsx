import React from "react";
import Carousel from "react-material-ui-carousel";
import { useWindowSize } from "../hooks/useWindowSize";
import { useState } from "react";
import { productType } from "../reducer/Types";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import * as services from "../services/functions";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Login } from "../pages/Login";
interface IMyProps {
  props: productType[];
}
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

const Carousel1 = ({ props }: IMyProps) => {
  const size = useWindowSize();
  return (
    <Carousel
      className="Carousel_Container"
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
            <div key={i} className="Card_cardscontainer">
              <Item key={i} item={array[i]} />
              <Item key={i + 1} item={array[i + 1]} />
              <Item key={i + 2} item={array[i + 2]} />
            </div>
          );
        }
        if (i === props.length - 2) {
          return (
            <div key={i} className="Card_cardscontainer">
              <Item key={i} item={array[i]} />
              <Item key={i + 1} item={array[7]} />
              <Item key={i + 2} item={array[0]} />
            </div>
          );
        }
        if (i === props.length - 1) {
          return (
            <div key={i} className="Card_cardscontainer">
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

const Item = (props: any) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  function getDetail(evt: Event, item: any) {
    navigate(`/detail/${item[0].code}`, { state: item[0] });
  }

  async function handleClick(evt: any, item: any) {
    let answer = await services.addFav(evt, item);
    if (answer === "") {
      handleOpen();
    }
  }
  return (
    <div key={props.item.code}>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Login close={handleClose} />
        </Box>
      </Modal>
      <div className="Card_container">
        <div className="Card_imgcontainer">
          <AiOutlineHeart
            onClick={(evt: any) => handleClick(evt, [props.item])}
            className="ITEM_heart"
          />
          <img
            onClick={(evt: any) => getDetail(evt, [props.item])}
            className="Card_imgs"
            alt="Not Found"
            src={props.item.galleryImages[0].url}
          ></img>
        </div>
        <div className="Card_textcontainer">
          <h2 className="Card_text">{props.item.name}</h2>
        </div>
      </div>
    </div>
  );
};

export { Carousel1, Item };
