import reactLogo from "./assets/react.svg";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Userpanel from "./pages/Userpanel";
import { useState, useEffect } from "react";
import axios from "axios";

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
  const [data, setData] = useState<product[]>([]);

  async function getManProducts(page: number) {
    const answer: any = await axios.get(
      `http://localhost:5000/api/users/product/${page}`
    );
    setData(answer.data);
  }

  useEffect(() => {
    getManProducts(1);
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home props1={data} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user/:name" element={<Userpanel />} />
    </Routes>
  );
}

export default App;
