import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import * as services from "../services/functions";

export const Item = (props: any) => {
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
