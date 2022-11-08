import React, { useContext } from "react";
import Navigation from "./../components/Navigation";
import { useState } from "react";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { Favorites } from "./Favs";
import { Link } from "react-router-dom";
import { Types } from "../reducer/Types";
import { AppContext } from "../reducer/context";

export default () => {
  const { state, dispatch } = useContext(AppContext);
  let username = window.localStorage.getItem("name");
  if (username) username = JSON.parse(username);
  const navigate = useNavigate();
  function handleLogout() {
    window.localStorage.clear();
    dispatch({
      type: Types.ClearChart,
      payload: [],
    });
    navigate("/");
  }

  return (
    <>
      <div className="Userpanel_container">
        <div>
          <div>{username}</div>
          <button onClick={handleLogout}>LOGOUT</button>
        </div>
        <Link to={`/user/${username}/favorites`}>
          <div>Favorites</div>
        </Link>
        <Link to={`/user/${username}/shopping_cart`}>
          <div>Shopping Cart</div>
        </Link>
        <div>Address</div>
      </div>
    </>
  );
};
