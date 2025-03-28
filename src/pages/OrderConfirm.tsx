import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Swal from 'sweetalert2';
import { productType, Types } from '../reducer/Types';
import { useState, useContext } from 'react';
import { AppContext } from '../reducer/context';

export const OrderConfirm = (props: any) => {
  useEnhancedEffect(() => {
    handleRender(payment_id);
    shoppingCartTotal();
    return () => {};
  }, []);
  const { dispatch } = useContext(AppContext);
  const [cartValue, setCartValue] = useState(0);
  const search: any = useLocation().search;
  const payment_id = new URLSearchParams(search).get('payment_id');
  const [cart] = useLocalStorage('cart', []);
  function shoppingCartTotal() {
    if (cart.length === 0) {
      setCartValue(0);
      return;
    }
    setCartValue(0);
    const total = cart.reduce((sum: number, p: productType) => {
      return sum + (p?.quantity ?? 0) * (p?.price.value ?? 0);
    }, 0);
    setCartValue(Math.round(total * 100) / 100);
  }
  const handleRender = async (payment_id: any) => {
    const token = window.localStorage.getItem('token');
    const Authorization = token ? 'Bearer ' + JSON.parse(token) : '';
    const answer = await axios.post(
      import.meta.env.VITE_BACKEND_URL + `api/pay/success/${payment_id}`,
      cart,
      {
        headers: { Authorization },
      },
    );
    window.localStorage.removeItem('cart');
    dispatch({ type: Types.SetQuantity, payload: 1 });
    await axios.delete(
      import.meta.env.VITE_BACKEND_URL + `api/users/cart/all`,
      {
        headers: { Authorization },
      },
    );
    Swal.fire({
      title: answer.data.message,
      icon: answer.data.icon,
      confirmButtonColor: '#9ea03b',
    });
  };

  const nf = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 2,
  });
  return (
    <div className="OrderConfirmContainer">
      {cart.map((p: any, i: any) => {
        return (
          <div key={p.name}>
            <div className="Cart_ProductInfo">
              <div className="Cart_imgPlusName">
                <div className="Cart_Name">{p.name}</div>
              </div>
              <div className="Cart_Price">{`${nf.format(
                p.price.value * 5000,
              )}`}</div>
              <div className="Cart_quantity">
                <div>{`${p.quantity}`}</div>
              </div>
              <div className="Cart_TotalPlusRemove">
                <div>{`${nf.format(
                  p.price.value * (p.quantity ? p.quantity : 0) * 5000,
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
