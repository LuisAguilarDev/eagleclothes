import React from "react";
import Navigation from "./../components/Navigation";
import { useState } from "react";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { Favorites } from "./Favs";

export default () => {
  let username = window.localStorage.getItem("name");
  if (username) username = JSON.parse(username);
  const navigate = useNavigate();
  function handleLogout() {
    window.localStorage.clear();
    navigate("/");
  }
  return (
    <>
      <Navigation />
      <div className="Userpanel_container">
        <div>
          <div>{username}</div>
          <button onClick={handleLogout}>LOGOUT</button>
        </div>
        <div>Favorites</div>
        <div>Shopping Cart</div>
        <div>Address</div>
      </div>
      <div>
        <Favorites />
      </div>
    </>
  );
};
