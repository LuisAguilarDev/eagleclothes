import React from "react";
import Logo from "../assets/logo.svg";
import Lupa from "../assets/lupa.svg";
import User from "../assets/user.svg";
import Bell from "../assets/bell.svg";
import Bag from "../assets/bag.svg";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

export default () => {
  const username = window.localStorage.getItem("name");
  return (
    <>
      <div className="Navigation_firstLine">
        <div className="other">Help</div>
        <div className="other">
          {username ? (
            <Link
              to={`user/${username.substring(1, username.length - 1)}`}
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
          <Link to="/">
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
          <div>
            <img className="Navigation_lupa" src={Lupa} alt="Not Found" />
          </div>
          <div>
            <img className="Navigation_user" src={User} alt="Not Found" />
          </div>
          <div>
            <AiOutlineHeart className="Navigation_heart" />
          </div>
          <div>
            <img className="Navigation_bag" src={Bag} alt="Not Found" />
          </div>
        </div>
      </nav>
    </>
  );
};
