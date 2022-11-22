import React, { useState, useContext } from "react";
import { AppContext } from "../reducer/context";
import { useLocation } from "react-router-dom";
import { productType } from "../reducer/Types";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { Button } from "@mui/material";
import { Types } from "../reducer/Types";
import { addToCart } from "../services/functions";
import * as magnifier from "react-image-magnify";
import { Zoom } from "../components/Img_ZoomOnHover";
import { useLocalStorage } from "../hooks/useLocalStorage";
import * as services from "../services/functions";

const Detail = () => {
  const location = useLocation();
  const [cart, setCart] = useLocalStorage("cart", []);
  const { state, dispatch } = useContext(AppContext);
  const product: productType = location.state;
  const [index, setIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  function onClick(index: number) {
    setIndex(index);
  }

  function addToCartLocal(item: productType) {
    let index = cart
      .map((p: productType) => {
        if (p.code === item.code) {
          return p.code;
        }
      })
      .indexOf(item.code);

    if (cart.length === 0) {
      return setCart([item]);
    }

    if (index === -1) {
      return setCart([...cart, item]);
    }

    if (index >= 0) {
      cart[index].quantity = cart[index].quantity + item.quantity;
      return setCart([...cart]);
    }
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
          {product.galleryImages.slice(0, 5).map((img: any, i: number) => {
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
        <div className="Detail_Zoom">
          <Zoom src={product.galleryImages[index].url}></Zoom>
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
                    <div className="Detail_text">{product.colorName[0]}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="Detail_ProductDetail">
            <div className="Detail_text">
              Price: {product.price.formattedValue}
            </div>
            <div className="Detail_IconPlusQuantity">
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
              onClick={() => {
                services.pay({ ...product, quantity });
              }}
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
                addToCartLocal({ ...product, quantity: quantity });
                addToCart(e, [{ ...product, quantity: quantity }]);
                dispatch({ type: Types.SetQuantity, payload: quantity });
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

export { Detail };
export default Detail;
