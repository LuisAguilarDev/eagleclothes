import React, { useState, useContext } from "react";
import { AppContext } from "../reducer/context";
import { useLocation } from "react-router-dom";
import { productType } from "../reducer/Types";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { Button } from "@mui/material";
import { Types } from "../reducer/Types";
import { addToCart } from "../services/functions";
import * as magnifier from "react-image-magnify";

const Detail = () => {
  const location = useLocation();
  const { state, dispatch } = useContext(AppContext);
  const product: productType = location.state;
  const [index, setIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  function onClick(index: number) {
    setIndex(index);
  }
  const nf = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
  return (
    <>
      <div className="Detail_ProductName">{product.name}</div>
      <div className="Detail_Container">
        <div className="Detail_imgContainer">
          {product.galleryImages.map((img: any, i: number) => {
            return (
              <img
                onMouseEnter={(e) => onClick(i)}
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
          <magnifier.default
            {...{
              smallImage: {
                alt: "Not Found",
                isFluidWidth: true,
                src: `${product.galleryImages[index].url}`,
                width: 350,
                smallImageClassName: "img_small",
              },
              largeImage: {
                src: `${product.galleryImages[index].url}`,
                width: 1400,
                height: 1400,
              },
            }}
          />
        </div>
        <div className="Main3">
          <div className="ColorSwap">
            <div className="Detail_text">Avaliable Colors</div>
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
          <div className="Detail_ProductDetail">
            <div className="Detail_text">
              Price: {product.price.formattedValue}
            </div>
            <div className="Detail_IconContainer">
              <AiFillMinusCircle
                size={"30px"}
                onClick={() => {
                  if (quantity === 1) return;
                  setQuantity(quantity - 1);
                }}
              />
            </div>
            <div className="Detail_text">Quantity: {quantity}</div>
            <div className="Detail_IconContainer">
              <AiFillPlusCircle
                size={"30px"}
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              />
            </div>
            <div className="Detail_text">
              Total: {nf.format(product.price.value * quantity)}
            </div>
          </div>
          <div className="Detail_buttonContainer">
            <Button
              key={1}
              sx={{
                borderColor: "#222222",
                color: "#222222",
                height: "40px",
                ":hover": { color: "blue" },
              }}
              variant="outlined"
            >
              BUY NOW{" "}
            </Button>
            <Button
              key={2}
              sx={{
                borderColor: "#222222",
                color: "#222222",
                height: "40px",
                ":hover": { color: "blue" },
              }}
              variant="outlined"
              onClick={(e: any) => {
                addToCart(e, [{ ...product, quantity: quantity }]);
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
