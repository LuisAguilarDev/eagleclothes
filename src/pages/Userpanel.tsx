import React, { useContext } from "react";
import Navigation from "./../components/Navigation";
import { useState } from "react";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { Favorites } from "../components/Favs";
import { Link } from "react-router-dom";
import { Types } from "../reducer/Types";
import { AppContext } from "../reducer/context";
import { Menu } from "../components/Menu";

export default () => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <>
      <Menu />
    </>
  );
};
