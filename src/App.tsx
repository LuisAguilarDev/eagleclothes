import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Userpanel from "./pages/Userpanel";
import UserpanelF from "./pages/Userpanel_Favorites";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Detail from "./pages/Detail";
import { useReducer } from "react";
import ShoppingCart from "./pages/ShoppingCart";
import { productType } from "./reducer/Types";
import Navigation from "./components/Navigation";
import Search from "./pages/search";

function App() {
  const [datam, setDatam] = useState<productType[]>([]);
  const [datam2, setDatam2] = useState<productType[]>([]);
  const [dataw, setDataw] = useState<productType[]>([]);
  const navigate = useNavigate();
  async function getProducts() {
    const answer: any = await axios.get(
      `http://localhost:5000/api/users/product/`
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
        <Route
          path="/login"
          element={
            <Login
              close={() => {
                console.log("Hello World");
              }}
            />
          }
        />
        <Route path="/user/:name" element={<Userpanel />} />
        <Route path="/user/:name/favorites" element={<UserpanelF />} />
        <Route path="/user/:name/shopping_cart" element={<ShoppingCart />} />
        <Route path="/detail/:itemCode" element={<Detail />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
