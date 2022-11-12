import React, { useContext } from "react";
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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { AppContext } from "../reducer/context";
import { Types } from "../reducer/Types";

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

const Card = (props: any) => {
  const { state, dispatch } = useContext(AppContext);
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
  async function handleDelete(evt: any, item: any) {
    let answer = await services.deleteFromFav(item);
    dispatch({
      type: Types.DeleteFav,
      payload: item[0],
    });
  }
  return (
    <div key={props.item.code}>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Login close={handleClose} />
        </Box>
      </Modal>
      <div className="Card1_container">
        <div className="Card1_imgcontainer">
          <div
            className="Card1_heartContainer"
            style={{ display: props.showFav ? "flex" : "none" }}
          >
            <AiOutlineHeart
              onClick={(evt: any) => handleClick(evt, [props.item])}
              className="Card1_heart"
            />
          </div>
          <div
            className="Card1_deleteContainer"
            style={{ display: props.showDel ? "flex" : "none" }}
          >
            <DeleteOutlineIcon
              onClick={(evt: any) => handleDelete(evt, [props.item])}
              className="Card1_delete"
            />
          </div>
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
        <div className="Card1_textcontainer">
          <h2 className="Card1_text">{props.item.price.formattedValue}</h2>
        </div>
      </div>
    </div>
  );
};

export { Card };
