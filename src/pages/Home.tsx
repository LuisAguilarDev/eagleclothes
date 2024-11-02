import { useEffect, useState } from 'react';
import { Carousel2 } from '../components/Carrousel2';
import { Carousel3 } from '../components/Carrousel3';
import { Carousel1 } from '../components/Carrousel1';
import { Text1 } from '../components/text1';
import axios from 'axios';
import { productType } from '../reducer/Types';

export default () => {
  const [dataM, setDataM] = useState<productType[]>([]);
  const [dataM2, setDataM2] = useState<productType[]>([]);
  const [dataW, setDataW] = useState<productType[]>([]);
  async function getProducts() {
    const answer: any = await axios.get(
      import.meta.env.VITE_BACKEND_URL + `api/users/product/`,
    );
    setDataM(answer.data.man);
    setDataM2(answer.data.man2);
    setDataW(answer.data.woman);
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="view100vw">
      <Text1 />
      <Carousel1 props={dataM} />
      <Carousel2 props={dataM2} />
      <Carousel3 props={dataW} />
    </div>
  );
};
