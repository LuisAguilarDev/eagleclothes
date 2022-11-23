import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../reducer/context";
import { Types } from "../reducer/Types";
import { Button } from "@mui/material";

const Menu = (props: any) => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const username2 = window.localStorage.getItem("name");
  const username = username2
    ? username2.substring(1, username2.length - 1)
    : null;
  function handleLogout() {
    window.localStorage.clear();
    window.localStorage.setItem("cart", JSON.stringify([]));
    dispatch({
      type: Types.ClearCart,
      payload: [],
    });
    dispatch({
      type: Types.SetQuantity,
      payload: 0,
    });
    navigate("/");
  }
  return (
    <div className="Menu_Container">
      <>
        <Link to={`/user/${username}/address`}>
          <div className="Menu_item">Address</div>
        </Link>
        <Link to={`/user/${username}/orders`}>
          <div className="Menu_item">My orders</div>
        </Link>
        <div className="Menu_buttonContainer">
          <Button
            id="button-checkout"
            sx={{
              borderColor: "#222222",
              color: "#222222",
              height: "40px",
              width: "70px",
              ":hover": { color: "blue" },
            }}
            variant="outlined"
            onClick={handleLogout}
            className="button-checkout"
          >
            LOGOUT
          </Button>
        </div>
      </>
    </div>
  );
};

export { Menu };
