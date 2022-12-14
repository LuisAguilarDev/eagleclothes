import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import UserpanelF from "./pages/Userpanel_Favorites";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Detail from "./pages/Detail";
import ShoppingCart from "./pages/ShoppingCart";
import { productType } from "./reducer/Types";
import Navigation from "./components/Navigation";
import Search from "./pages/Search";
import { Validate } from "./pages/Validate";
import Address from "./pages/Address";
import AddAddress from "./pages/AddAddress";
import { useLocalStorage } from "./hooks/useLocalStorage";
import OrderConfirm from "./pages/OrderConfirm";
import Orders from "./pages/Orders";
import Forgot from "./pages/ForgotPassword";
import Reset from "./pages/Reset";

function App() {
  const [datam, setDatam] = useState<productType[]>([]);
  const [datam2, setDatam2] = useState<productType[]>([]);
  const [dataw, setDataw] = useState<productType[]>([]);
  const [cart, setCart, getCart] = useLocalStorage("cart", []);
  const navigate = useNavigate();
  async function getProducts() {
    const answer: any = await axios.get(
      `https://eagleclothesbackend.onrender.com/api/users/product/`
    );
    setDatam(answer.data.man);
    setDatam2(answer.data.man2);
    setDataw(answer.data.woman);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={<Home props1={datam} props2={datam2} props3={dataw} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/user/validate" element={<Validate />} />
        <Route path="/user/:name/favorites" element={<UserpanelF />} />
        <Route path="/user/:name/shopping_cart" element={<ShoppingCart />} />
        <Route path="/user/:name/address" element={<Address />} />
        <Route path="/user/:name/addAddress" element={<AddAddress />} />
        <Route path="/user/:name/orders" element={<Orders />} />
        <Route path="/detail/:itemCode" element={<Detail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/orderConfirm" element={<OrderConfirm />} />
        <Route path="/forgotPassword" element={<Forgot />} />
        <Route path="/resetPassword" element={<Reset />} />
      </Routes>
    </>
  );
}

export default App;
