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
      <Navigation />
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
              <>
                <div className={`ColorSwap${i}`}>
                  <style>{`.ColorSwap${i}{background-color:#${color}}`}</style>
                  <div className="Texto_Transparente">
                    {product.colorName[0]}
                  </div>
                </div>
                <div>
                  <div>{product.colorName[0]}</div>
                </div>
              </>
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
              console.log(temp);
              if (temp.length > 0) {
                return temp[0].quantity
                  ? (temp[0].quantity = temp[0].quantity + quantity)
                  : 0;
              }
              return dispatch({
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

{
  /* <div
  class="large"
  id="img_large"
  style='display: none; left: -622.25px; top: -910.5px; background-position: -460px 347px; background-image: url("https://patprimo.vteximg.com.br/arquivos/ids/1084150-1500-1800/sacos-para-mujer-30060059-40123_3.jpg?v=637777863230270000");'
></div>; */
}

export default Detail;
