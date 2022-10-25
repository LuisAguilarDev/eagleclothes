import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { data } from "../data/data";
import { useWindowSize } from "../hooks/useWindowSize";

function Carousel1(props: any) {
  const size = useWindowSize();
  return (
    <Carousel
      sx={{
        // mt: "0",
        height: 600,
      }}
      navButtonsProps={{
        style: {
          background: "white",
          color: "black",
          width: "64px",
          height: "64px",
          fontSize: "21px !important",
          ["svg" as any]: {
            height: "2em !important",
            width: "2em !important",
          },
          ["&:hover" as any]: {
            background: "red",
            opacity: "none",
          },
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
      {data?.results
        ?.map((item, i, array) => {
          if (array[i + 2]) {
            return (
              <div className="Card1_cardscontainer">
                <Item key={i} item={item} />
                <Item key={i + 1} item={array[i + 1]} />
                <Item key={i + 2} item={array[i + 2]} />
              </div>
            );
          }
          {
          }
        })
        .splice(0, data?.results.length - 3)}
    </Carousel>
  );
}

function Item(props: any) {
  return props.item?.images && props?.item ? (
    <>
      <div className="Card1_container">
        <div className="Card1_imgcontainer">
          <img className="Card1_imgs" alt="45" src={props.item.images[0].url} />
        </div>
        <div className="Card1_textcontainer">
          <h2 className="Card1_text">{props.item.name}</h2>
        </div>
      </div>
    </>
  ) : (
    <div></div>
  );
}
export { Carousel1, Item };
