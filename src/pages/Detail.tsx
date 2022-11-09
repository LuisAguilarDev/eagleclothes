import React, { useState, useContext } from "react";
import { AppContext } from "../reducer/context";
import { useLocation } from "react-router-dom";
import { productType } from "../reducer/Types";
import Navigation from "../components/Navigation";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { Button } from "@mui/material";
import { Types } from "../reducer/Types";

const Detail = () => {
  const location = useLocation();
  const { state, dispatch } = useContext(AppContext);
  const product: productType = location.state;
  const [index, setIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  function onClick(index: number) {
    setIndex(index);
  }
  return (
    <>
      <div>{product.name}</div>
      <div className="Detail_Container">
        <div className="Detail_imgContainer">
          {product.galleryImages.map((img: any, i: number) => {
            return (
              <img
                key={i}
                onClick={(e) => onClick(i)}
                className="Detail_img"
                src={img.url as string}
                alt="not found"
              />
            );
          })}
        </div>
        <div className="Detail_imgContainerBig">
          <img
            className="Detail_main"
            src={product.galleryImages[index].url as string}
            alt="not found"
          />
        </div>
        <div className="ColorSwap">
          <div>Avaliable Colors</div>
          {product.color.map((color, i) => {
            return (
              <div key={i}>
                <div className={`ColorSwap${i}`}>
                  <style>{`.ColorSwap${i}{background-color:#${color}}`}</style>
                  <div className="Texto_Transparente">
                    {product.colorName[0]}
                  </div>
                </div>
                <div>
                  <div>{product.colorName[0]}</div>
                </div>
              </div>
            );
          })}
        </div>
        <>
          <div>Price: {product.price.formattedValue}</div>
        </>
        <>
          <AiFillMinusCircle
            onClick={() => {
              if (quantity === 1) return;
              setQuantity(quantity - 1);
            }}
          />
          <div>Quantity: {quantity}</div>
          <AiFillPlusCircle
            onClick={() => {
              setQuantity(quantity + 1);
            }}
          />
        </>
        <>
          <Button
            key={1}
            sx={{
              color: "black",
              bgcolor: "yellow",
              ":hover": {
                bgcolor: "green",
              },
            }}
            variant="outlined"
          >
            BUY NOW{" "}
          </Button>
          <Button
            key={2}
            sx={{
              color: "black",
              bgcolor: "yellow",
              ":hover": {
                bgcolor: "green",
              },
            }}
            variant="contained"
            onClick={() => {
              let temp = state.shoppingCart.filter((p) => {
                return p.code === product.code;
              });
              if (temp.length > 0) {
                temp[0].quantity
                  ? (temp[0].quantity = temp[0].quantity + quantity)
                  : 0;
                dispatch({
                  type: Types.SetQuantity,
                  payload: quantity,
                });
                return;
              }
              dispatch({
                type: Types.Add,
                payload: { ...product, quantity: quantity },
              });
            }}
          >
            ADD TO CART{" "}
          </Button>
        </>
      </div>
    </>
  );
};

export default Detail;
