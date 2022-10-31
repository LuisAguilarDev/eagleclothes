import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../reducer/context";
import Navigation from "./../components/Navigation";
import { useNavigate } from "react-router-dom";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { Button } from "@mui/material";
import { productType, Types } from "../reducer/Types";

export default () => {
  const [cartValue, setCartValue] = useState(0);
  const [quantities, setQuantities] = useState(0);
  const username = window.localStorage.getItem("name");
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  function handleLogout() {
    window.localStorage.clear();
    navigate("/");
  }
  function handleDeletion(product: productType) {
    return dispatch({
      type: Types.Add,
      payload: product,
    });
  }

  const nf = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  function shoppingCartTotal() {
    if (state.shoppingCart.length === 0) return;
    setCartValue(0);
    state.shoppingCart.forEach((p) => {
      let quantity: number = p.quantity ? p.quantity : 0;
      let price: number = p.price.value ? p.price.value : 0;
      let total = quantity * price;
      setCartValue((prev) => {
        return Math.round((prev + total) * 100) / 100;
      });
    });
  }
  useEffect(() => {
    return shoppingCartTotal();
  }, [quantities]);

  return (
    <>
      <Navigation />
      <div>
        <div>{username}</div>
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
      <div>Favorites</div>
      <div>Shopping Cart</div>
      <div>Address</div>
      {state.shoppingCart.length === 0
        ? null
        : state.shoppingCart?.map((p) => {
            return (
              <div className="ShopingCart_Container">
                <img src={p.images}></img>
                <div>{p.name}</div>
                <div>{`${nf.format(p.price.value)}`}</div>
                <AiFillMinusCircle
                  onClick={() => {
                    if (p.quantity === 1) return;
                    let quantity: number = p.quantity ? p.quantity : 0;
                    p.quantity = quantity - 1;
                    setQuantities(quantities + 1);
                  }}
                />
                <div>{`${p.quantity}`}</div>
                <AiFillPlusCircle
                  onClick={() => {
                    console.log("click");
                    let quantity: number = p.quantity ? p.quantity : 0;
                    p.quantity = quantity + 1;
                    setQuantities(quantities + 1);
                  }}
                />

                <div>{`${nf.format(
                  p.price.value * (p.quantity ? p.quantity : 0)
                )}`}</div>
                <Button onClick={handleDeletion}>X</Button>
              </div>
            );
          })}
      <div>Total: {nf.format(cartValue)}</div>
    </>
  );
};
