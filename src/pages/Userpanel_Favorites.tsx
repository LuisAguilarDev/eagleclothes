import React from "react";
import Navigation from "./../components/Navigation";
import { useState } from "react";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { Favorites } from "../components/Favs";
import { Menu } from "../components/Menu";

export default () => {
  return (
    <div className="UserPanelF_MainContainer">
      <Menu />
      <Favorites />
    </div>
  );
};
