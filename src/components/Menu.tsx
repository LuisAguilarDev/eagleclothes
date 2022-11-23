import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../reducer/context";
import { Types } from "../reducer/Types";

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
        <>
          <button onClick={handleLogout}>LOGOUT</button>
        </>
      </>
    </div>
  );
};

export { Menu };
