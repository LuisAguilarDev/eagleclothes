import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../reducer/context";
import { useNavigate } from "react-router-dom";
import * as services from "../services/functions";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { Button } from "@mui/material";
import { productType, Types } from "../reducer/Types";
import { deleteFromCart, updateQuantity } from "../services/functions";
import { Menu } from "../components/Menu";

export default () => {
  const [cartValue, setCartValue] = useState(0);
  const [quantities, setQuantities] = useState(0);
  const username = window.localStorage.getItem("name");
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
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
  function handleDeletion(product: productType) {}

  const nf = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  function shoppingCartTotal() {
    if (state.shoppingCart.length === 0) {
      setCartValue(0);
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
  }, [state.quantity]);

  return (
    <div className="Shoping_CartMainContainer">
      <Menu />
      <div className="Cart_ProductInfoContainer">
        <div className="Cart_Header">
          <div className="Cart_Product">Product</div>
          <div className="Cart_PriceH">Price</div>
          <div className="Cart_quantityH">Quantity</div>
          <div>Total</div>
        </div>
        <div className="ShopingCart_Container">
          {state.shoppingCart.length === 0 ? (
            <h1 className="Empty_Message">
              You don't have products in your cart yet, go and find something
              you love.
            </h1>
          ) : (
            state.shoppingCart?.map((p, i) => {
              return (
                <div key={i}>
                  <div className="Cart_ProductInfo">
                    <div className="Cart_imgPlusName">
                      <img className="Cart_ProductImg" src={p.images}></img>
                      <div className="Cart_Name">{p.name}</div>
                    </div>
                    <div className="Cart_Price">{`${nf.format(
                      p.price.value
                    )}`}</div>
                    <div className="Cart_quantity">
                      <AiFillMinusCircle
                        onClick={() => {
                          if (p.quantity === 1) return;
                          let quantity: number = p.quantity ? p.quantity : 0;
                          p.quantity = quantity - 1;
                          setQuantities(quantities + 1);
                          updateQuantity(p.code, -1);
                          dispatch({
                            type: Types.SetQuantity,
                            payload: -1,
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
                          updateQuantity(p.code, 1);
                          dispatch({
                            type: Types.SetQuantity,
                            payload: 1,
                          });
                          shoppingCartTotal();
                        }}
                      />
                    </div>
                    <div className="Cart_TotalPlusRemove">
                      <div>{`${nf.format(
                        p.price.value * (p.quantity ? p.quantity : 0)
                      )}`}</div>
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: "#222222",
                          color: "#222222",
                          height: "40px",
                          minWidth: "40px",
                          ":hover": { color: "blue" },
                        }}
                        onClick={() => {
                          deleteFromCart(p);
                          dispatch({
                            type: Types.Delete,
                            payload: p,
                          });
                          dispatch({
                            type: Types.SetQuantity,
                            payload: p.quantity ? -p.quantity : 0,
                          });
                        }}
                      >
                        X
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      {state.shoppingCart.length === 0 ? null : (
        <div className="Cart_totalandPay">
          <div className="Cart_PriceTotal">Total: {nf.format(cartValue)}</div>
          <div className="Cart_buttonContainer">
            <Button
              sx={{
                borderColor: "#222222",
                color: "#222222",
                height: "40px",
                ":hover": { color: "blue" },
              }}
              variant="outlined"
            >
              Pay Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
