import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../reducer/context";
import { useNavigate } from "react-router-dom";
import * as services from "../services/functions";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { Button } from "@mui/material";
import { productType, Types } from "../reducer/Types";
import { deleteFromCart, updateQuantity } from "../services/functions";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Payment } from "../services/mercadopago";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const style = {
  position: "absolute" as "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default () => {
  const [cartValue, setCartValue] = useState(0);
  const [quantities, setQuantities] = useState(0);
  const username = window.localStorage.getItem("name");
  const [cart, setCart, getCart] = useLocalStorage("cart", []);
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [payment, setPayment] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleDeletion(product: productType) {
    const actualCart = getCart("cart");
    const newCart = actualCart.filter((item: productType) => {
      return item.code !== product.code;
    });
    setCart(newCart);
  }

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
    <div className="Shoping_CartMainContainer2">
      <div className="Shoping_CartMainContainer">
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
                          <DeleteOutlineIcon />
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
            <div className="Cart_Summary">Purchase summary</div>
            <div className="Cart_resumeBox">
              <div className="Cart_PriceTotal">
                <div>Total:</div>
                <div>{nf.format(cartValue)}</div>
              </div>

              <div className="Cart_SummaryShipping">
                <div>Shipping:</div>
                <div>{nf.format(5)} </div>
              </div>
              <div className="Cart_PriceTotal">
                <div>Total + Shipping:</div>
                <div>{nf.format(cartValue + 5)}</div>
              </div>
            </div>
            <div className="Cart_buttonContainer">
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div className="Plain_text">
                    Por ahora solo ofrecemos ventas desde Colombia, se
                    convertira el valor de su compra a Pesos Colombianos a una
                    TRM de $5.000
                  </div>
                  <div className="Cart_Summary">Resumen de Compra</div>
                  <div className="Cart_resumeBox">
                    <div className="Cart_PriceTotal">
                      <div>Total:</div>
                      <div>{nf.format(cartValue * 5000)}</div>
                    </div>

                    <div className="Cart_SummaryShipping">
                      <div>Envio:</div>
                      <div>{nf.format(5 * 5000)} </div>
                    </div>
                    <div className="Cart_PriceTotal">
                      <div>Total + Envio:</div>
                      <div>{nf.format((cartValue + 5) * 5000)}</div>
                    </div>
                  </div>
                  <Payment cart={cart} />
                </Box>
              </Modal>
              <Button
                sx={{
                  borderColor: "#222222",
                  color: "#222222",
                  height: "40px",
                  ":hover": { color: "blue" },
                }}
                variant="outlined"
                onClick={() => {
                  setPayment(true);
                  setOpen(true);
                }}
              >
                Pay Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
