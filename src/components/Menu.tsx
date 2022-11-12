import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../reducer/context";
import { Types } from "../reducer/Types";

const Menu = (props: any) => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const username2 = window.localStorage.getItem("name");
  const username = username2
    ? username2.substring(1, username2.length - 1)
    : "";
  function handleLogout() {
    window.localStorage.clear();
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
      <div className="Menu_usernameLogOut">
        <div>{username}</div>
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
      <Link to={`/user/${username}/shopping_cart`}>
        <div className="Menu_item">Shopping Cart</div>
      </Link>
      <Link to={`/user/${username}/favorites`}>
        <div className="Menu_item">Favorites</div>
      </Link>
      <Link to={`/user/${username}/address`}>
        <div className="Menu_item">Address</div>
      </Link>
    </div>
  );
};

export { Menu };
