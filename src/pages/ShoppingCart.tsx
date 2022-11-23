import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../reducer/context";
import { useNavigate } from "react-router-dom";
import * as services from "../services/functions";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { Button } from "@mui/material";
import { productType, Types } from "../reducer/Types";
import { deleteFromCart, updateQuantity } from "../services/functions";
import { Menu } from "../components/Menu";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Payment } from "../services/mercadopago";

export default () => {
  const [cartValue, setCartValue] = useState(0);
  const [quantities, setQuantities] = useState(0);
  const username = window.localStorage.getItem("name");
  const [cart, setCart, getCart] = useLocalStorage("cart", []);
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [payment, setPayment] = useState(true);

  function handleLogout() {
    window.localStorage.clear();
    dispatch({
      type: Types.SetQuantity,
      payload: 0,
    });
    navigate("/");
  }
  function handleDeletion(product: productType) {
    const actualCart = getCart("cart");
    const newCart = actualCart.filter((item: productType) => {
      return item.code !== product.code;
    });
    setCart(newCart);
  }

  const handlePay = async () => {
    const preference = await services.pay(cart);
    console.log(preference, "id");
    var script = document.createElement("script");
    script.src =
      "https://mercadopago.com.co/integrations/v1/web-payment-checkout.js";
    script.type = "text/javascript";
    script.dataset.preferenceId = preference.id;
    document.getElementById("cho-container")!.innerHTML = "";
    document.querySelector("cho-container")?.appendChild(script);
  };

  const nf = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  function shoppingCartTotal() {
    if (cart.length === 0) {
      setCartValue(0);
      return;
    }
    setCartValue(0);
    let answer = cart.map((p: productType) => {
      let quantity: number = p.quantity ? p.quantity : 0;
      let price: number = p.price.value ? p.price.value : 0;
      let total = quantity * price;
      return total;
    });
    let total = answer.reduce((a: any, b: any) => a + b, 0);
    total = total ? total : 0;
    let data = Math.round(total * 100) / 100;
    setCartValue(data);
  }
  useEffect(() => {
    shoppingCartTotal();
  }, [quantities]);

  return (
    <>
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
            {cart.length === 0 ? (
              <h1 className="Empty_Message">
                You don't have products in your cart yet, go and find something
                you love.
              </h1>
            ) : (
              cart.map((p: any, i: any) => {
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
                            handleDeletion(p);
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
        {cart.length === 0 ? null : (
          <div className="Cart_totalandPay">
            <div className="Cart_PriceTotal">Total: {nf.format(cartValue)}</div>
            <div className="Cart_buttonContainer">
              {payment ? null : <Payment cart={[...cart]} />}
              <Button
                id="button-checkout"
                sx={{
                  borderColor: "#222222",
                  color: "#222222",
                  height: "40px",
                  ":hover": { color: "blue" },
                }}
                variant="outlined"
                onClick={() => {
                  setPayment(false);
                }}
                className="button-checkout"
              >
                Pay Now
              </Button>
              <div></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
