import reactLogo from "./assets/react.svg";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Userpanel from "./pages/Userpanel";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Detail from "./pages/Detail";

export interface product {
  category: String;
  code: String;
  name: String;
  pk: Number;
  price: {
    value: Number;
    formattedValue: String;
  };
  variantSizes: [{ filtercode: String }];
  color: [String];
  colorName: [String];
  galleryImages: [{ url: String }];
  images: String;
}

function App() {
  const [datam, setDatam] = useState<product[]>([]);
  const [datam2, setDatam2] = useState<product[]>([]);
  const [dataw, setDataw] = useState<product[]>([]);
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
    <Routes>
      <Route
        path="/"
        element={<Home props1={datam} props2={datam2} props3={dataw} />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/user/:name" element={<Userpanel />} />
      <Route path="/detail/:itemCode" element={<Detail />} />
    </Routes>
  );
}

export default App;
