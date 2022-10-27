import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { product } from "../App";
import Navigation from "../components/Navigation";

const Detail = () => {
  const location = useLocation();
  const product: product = location.state;
  const [index, setIndex] = useState(0);
  function onClick(index: number) {
    setIndex(index);
  }
  console.log(product);
  return (
    <>
      <Navigation />
      <div>{product.name}</div>
      <div className="Detail_Container">
        <div className="Detail_imgContainer">
          {product.galleryImages.map((img, i) => {
            return (
              <img
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
