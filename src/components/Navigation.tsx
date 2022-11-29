import React, { useContext, useState, useEffect } from "react";
import Logo from "../assets/logo.svg";
import Lupa from "../assets/lupa.svg";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import axios from "axios";
import { AppContext } from "../reducer/context";
import { productType, Types } from "../reducer/Types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Menu } from "../components/Menu";

export default () => {
  const Navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [cart, setCart, getCart] = useLocalStorage("cart", []);
  const username = window.localStorage.getItem("name");
  const { state, dispatch } = useContext(AppContext);
  const [quantity, setQuantity] = useState(0);

  function getquantity() {
    const newCart = getCart("cart");
    setCart(newCart);
    if (!Array.isArray(newCart)) {
      setCart([]);
    }
    if (newCart.length > 0) {
      const answer = newCart.map((item: productType, i: any) => {
        return item.quantity;
      });
      let total = answer.reduce((a: any, b: any) => a + b, 0);
      total = total ? total : 0;
      setQuantity(total);
    }
  }

  function handleChange(e: any) {
    setSearch(e.target.value);
  }

  function handleSearch(e: any) {
    if (e.key !== "Enter") return;
    axios
      .get(
        `https://eagleclothes-backend-production.up.railway.app/api/search/${search}`
      )
      .then((res) => {
        dispatch({
          type: Types.Search,
          payload: res.data.search,
        });
        dispatch({
          type: Types.Loading,
          payload: !state.loading,
        });
        e.target.value = "";
        Navigate("/search");
      });
  }

  useEffect(() => {
    getquantity();
  }, [state.quantity]);

  return (
    <div className="view100vw">
      <div className="Navigation_MAINCONTAINER">
        <div className="Navigation_firstLine">
          <div className="other">Help</div>
          <div className="other">
            {username ? (
              <div className="Navigation_menu">
                <div className="Navigation_username">
                  {username.substring(1, username.length - 1)}
                </div>
                <Menu />
              </div>
            ) : (
              <Link to="login" className="links">
                Register / Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
      <nav className="Navigation_Nav">
        <div className="Navigation_Logo">
          <Link to={"/"}>
            <img className="Navigation_img" src={Logo} alt="Not Found" />
          </Link>
        </div>
        <div className="Navigation_Middle">
          <div>SHOP</div>
          <div>PROMOTIONS</div>
          <div>ABOUT US</div>
        </div>
        <div className="Navigation_icons">
          <input
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => handleSearch(e)}
            className="Navigation_lupa_input"
            placeholder="Search products..."
            autoComplete="off"
          ></input>
          <div className="Navigation_Separator">
            <img
              onClick={handleSearch}
              className="Navigation_lupa"
              src={Lupa}
              alt="Not Found"
            />
          </div>
          <div className="Navigation_Separator">
            {username ? (
              <Link
                to={`/user/${username!.substring(
                  1,
                  username!.length - 1
                )}/favorites`}
              >
                <AiOutlineHeart className="Navigation_heart" />
              </Link>
            ) : (
              <Link to="/login">
                <AiOutlineHeart className="Navigation_heart" />
              </Link>
            )}
          </div>
          <div className="Navigation_Separator">
            <Badge badgeContent={quantity} color="primary">
              {username ? (
                <Link
                  to={`/user/${username!.substring(
                    1,
                    username!.length - 1
                  )}/shopping_cart`}
                >
                  <LocalMallOutlinedIcon className="Navigation_bag" />
                </Link>
              ) : (
                <Link to={`/user/none/shopping_cart`}>
                  <LocalMallOutlinedIcon className="Navigation_bag" />
                </Link>
              )}
            </Badge>
          </div>
        </div>
      </nav>
    </div>
  );
};
