import React from "react";
import Carousel from "react-material-ui-carousel";
import { useWindowSize } from "../hooks/useWindowSize";
import { useState } from "react";
import { productType } from "../reducer/Types";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import * as services from "../services/functions";
import Modal from "@mui/material/Modal";
import Login from "../pages/Login";
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
      navigate("/login", {
        state: { message: "You must loging first to use all page features" },
      });
    }
  }
  return props.item?.images && props?.item ? (
    <div key={props.item.code}>
      <Modal open={open} onClose={handleClose}>
        <Login />
      </Modal>
      ;
      <div className="Card1_container">
        <div className="Card1_imgcontainer">
          <AiOutlineHeart
            onClick={(evt: any) => handleClick(evt, [props.item])}
            className="ITEM_heart"
          />
          <img
            onClick={(evt: any) => getDetail(evt, [props.item])}
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
};

export { Carousel1, Item };
