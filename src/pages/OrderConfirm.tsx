import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Swal from "sweetalert2";
import { productType } from "../reducer/Types";
import { useState } from "react";

export const OrderConfirm = (props: any) => {
  useEnhancedEffect(() => {
    handleRender(payment_id);
    shoppingCartTotal();
    return () => {};
  }, []);
  const [cartValue, setCartValue] = useState(0);
  const search: any = useLocation().search;
  const payment_id = new URLSearchParams(search).get("payment_id");
  const merchant_order_id = new URLSearchParams(search).get(
    "merchant_order_id"
  );
  const [cart, setCart, getCart] = useLocalStorage("cart", []);
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
  const handleRender = async (payment_id: any) => {
    console.log(payment_id);
    const token = window.localStorage.getItem("token");
    const Authorization = token ? "Bearer " + JSON.parse(token) : "";
    const answer = await axios.post(
      `http://localhost:5000/api/pay/success/${payment_id}`,
      cart,
      {
        headers: { Authorization },
      }
    );
    window.localStorage.removeItem("cart");
    const deletedItems = await axios.delete(
      `http://localhost:5000/api/users/cart/all`,
      {
        headers: { Authorization },
      }
    );
    Swal.fire({
      title: answer.data.message,
      icon: answer.data.icon,
      confirmButtonColor: "#9ea03b",
    });
  };

  const nf = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 2,
  });
  return (
    <div className="OrderConfirmContainer">
      {cart.map((p: any, i: any) => {
        return (
          <div key={i}>
            <div className="Cart_ProductInfo">
              <div className="Cart_imgPlusName">
                <div className="Cart_Name">{p.name}</div>
              </div>
              <div className="Cart_Price">{`${nf.format(
                p.price.value * 5000
              )}`}</div>
              <div className="Cart_quantity">
                <div>{`${p.quantity}`}</div>
              </div>
              <div className="Cart_TotalPlusRemove">
                <div>{`${nf.format(
                  p.price.value * (p.quantity ? p.quantity : 0) * 5000
                )}`}</div>
              </div>
            </div>
          </div>
        );
      })}
      <div>
        <div className="Cart_ProductInfo">
          <div className="Cart_imgPlusName">
            <div className="Cart_Name">Envio:</div>
          </div>
          <div className="Cart_Price">{`${nf.format(5 * 5000)}`}</div>
          <div className="Cart_quantity">
            <div>{`${1}`}</div>
          </div>
          <div className="Cart_TotalPlusRemove">
            <div>{`${nf.format(5 * 5000)}`}</div>
          </div>
        </div>
      </div>
      <div>
        <div className="Cart_ProductInfo">
          <div className="Cart_imgPlusName">
            <div className="Cart_Name">Total + Envio:</div>
          </div>
          <div className="Cart_TotalPlusRemove">
            <div>{`${nf.format(cartValue * 5000 + 25000)}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;
