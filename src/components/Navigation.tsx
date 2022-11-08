import React, { useContext, useState, useEffect } from "react";
import Logo from "../assets/logo.svg";
import Lupa from "../assets/lupa.svg";
import User from "../assets/user.svg";
import Bell from "../assets/bell.svg";
import Bag from "../assets/bag.svg";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { AppContext } from "../reducer/context";

export default () => {
  const username = window.localStorage.getItem("name");
  const { state, dispatch } = useContext(AppContext);
  const [quantity, setQuantity] = useState(0);
  function getquantity() {
    const answer = state.shoppingCart.map((item, i) => {
      if (!item.quantity) return 0;
      return item.quantity;
    });
    let total = answer.reduce((a, b) => a + b, 0);
    total = total ? total : 0;
    setQuantity(total);
  }
  useEffect(() => {
    getquantity();
  }, [state.loading]);
  return (
    <>
      <div className="Navigation_firstLine">
        <div className="other">Help</div>
        <div className="other">
          {username ? (
            <Link
              to={`/user/${username.substring(1, username.length - 1)}`}
              className="links"
            >
              {username.substring(1, username.length - 1)}
            </Link>
          ) : (
            <Link to="login" className="links">
              Register / Sign In
            </Link>
          )}
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
          <input className="Navigation_lupa_input"></input>
          <div className="Navigation_Separator">
            <img className="Navigation_lupa" src={Lupa} alt="Not Found" />
          </div>
          <div className="Navigation_Separator">
            <img className="Navigation_user" src={User} alt="Not Found" />
          </div>
          <div className="Navigation_Separator">
            <AiOutlineHeart className="Navigation_heart" />
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
    </>
  );
};
