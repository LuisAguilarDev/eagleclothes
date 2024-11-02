import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { Carousel2 } from "../components/Carrousel2";
import { Carousel3 } from "../components/Carrousel3";
import { Carousel1 } from "../components/Carrousel1";
import { Text1 } from "../components/text1";
import axios from "axios";
import { productType } from "../reducer/Types";

export default () => {
  const [props1, setDatam] = useState<productType[]>([]);
  const [props2, setDatam2] = useState<productType[]>([]);
  const [props3, setDataw] = useState<productType[]>([]);
  async function getProducts() {
    const answer: any = await axios.get(
      import.meta.env.VITE_BACKEND_URL + `api/users/product/`
    );
    setDatam(answer.data.man);
    setDatam2(answer.data.man2);
    setDataw(answer.data.woman);
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="view100vw">
      <Text1 />
      <Carousel1 props={props1} />
      <Carousel2 props={props2} />
      <Carousel3 props={props3} />
      <Footer />
    </div>
  );
};
