import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { useWindowSize } from "../hooks/useWindowSize";
import { useReducer } from "react";
import { INITIAL_STATE, postReducer } from "../reducer/reducerConfig";
import axios from "axios";
import { useState, useEffect } from "react";

function Carousel1(props: any) {
  const size = useWindowSize();
  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);
  const [data, setData] = useState<any[]>([]);
  // dispatch({ type: "INITIAL_FETCH" });

  async function getManProducts(page: number) {
    const answer: any = await axios.get(
      `http://localhost:5000/api/users/product/${page}`
    );
    console.log(answer.data, "answer");
    setData(answer.data);
  }

  useEffect(() => {
    getManProducts(1);
  }, []);

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
      {data
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
        .splice(0, data?.length - 3)}
    </Carousel>
  );
}

function Item(props: any) {
  console.log(props);
  return props.item?.images && props?.item ? (
    <>
      <div className="Card1_container">
        <div className="Card1_imgcontainer">
          <img className="Card1_imgs" alt="Not Found" src={props.item.images} />
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
