import React from "react";
import Logo from "../assets/logo.svg";
import Lupa from "../assets/lupa.svg";
import User from "../assets/user.svg";
import Bell from "../assets/bell.svg";
import Bag from "../assets/bag.svg";

export default () => {
  return (
    <>
      <div className="Navigation_firstLine">
        <div>...</div>
        <div className="Navigation_login">
          <div className="other">Help</div>
          <div className="other">Register / Sign In</div>
        </div>
      </div>
      <nav className="Navigation_Nav">
        <div className="Navigation_Logo">
          <img className="Navigation_img" src={Logo} alt="Not Found" />
        </div>
        <div className="Navigation_Middle">
          <div>SHOP</div>
          <div>PROMOTIONS</div>
          <div>ABOUT US</div>
        </div>
        <div className="Navigation_icons">
          <div>
            <img className="Navigation_lupa" src={Lupa} alt="Not Found" />
          </div>
          <div>
            <img className="Navigation_user" src={User} alt="Not Found" />
          </div>
          <div>
            <img className="Navigation_bell" src={Bell} alt="Not Found" />
          </div>
          <div>
            <img className="Navigation_bag" src={Bag} alt="Not Found" />
          </div>
        </div>
      </nav>
    </>
  );
};
