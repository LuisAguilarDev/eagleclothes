import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import { data } from "../data/data";
import men from "../assets/men.png";

export default (props: any) => {
  return (
    <div className="Card_container">
      <div>
        <img className="Card_imgs" src={props.props.images[0].url} />
      </div>
      <div>
        <h2>{props.props.name}</h2>
      </div>
    </div>
  );
};
