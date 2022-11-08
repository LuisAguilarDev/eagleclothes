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
    dispatch({
      type: Types.ClearChart,
      payload: [],
    });
    navigate("/");
  }
  function handleDeletion(product: productType) {}

  const nf = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  function shoppingCartTotal() {
    if (state.shoppingCart.length === 0) {
      setCartValue(0);
      console.log(cartValue);
      return;
    }
    setCartValue(0);
    let answer = state.shoppingCart.map((p) => {
      let quantity: number = p.quantity ? p.quantity : 0;
      let price: number = p.price.value ? p.price.value : 0;
      let total = quantity * price;
      return total;
    });
    let total = answer.reduce((a, b) => a + b, 0);
    total = total ? total : 0;
    let data = Math.round(total * 100) / 100;
    setCartValue(data);
  }
  useEffect(() => {
    shoppingCartTotal();
  }, [state.loading]);

  return (
    <>
      <div>
        <div>{username}</div>
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
      <div>Favorites</div>
      <div>Shopping Cart</div>
      <div>Address</div>
      {state.shoppingCart.length === 0
        ? null
        : state.shoppingCart?.map((p, i) => {
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
                    dispatch({
                      type: Types.Update,
                      payload: false,
                    });
                    shoppingCartTotal();
                  }}
                />
                <div>{`${p.quantity}`}</div>
                <AiFillPlusCircle
                  onClick={() => {
                    let quantity: number = p.quantity ? p.quantity : 0;
                    p.quantity = quantity + 1;
                    setQuantities(quantities + 1);
                    dispatch({
                      type: Types.Update,
                      payload: false,
                    });
                    shoppingCartTotal();
                  }}
                />
                <Button
                  onClick={() => {
                    dispatch({
                      type: Types.Delete,
                      payload: p,
                    });
                    dispatch({
                      type: Types.Update,
                      payload: false,
                    });
                  }}
                >
                  X
                </Button>
                <div>{`${nf.format(
                  p.price.value * (p.quantity ? p.quantity : 0)
                )}`}</div>
              </div>
            );
          })}
      <div>Total: {nf.format(cartValue)}</div>
    </>
  );
};
