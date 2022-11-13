import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AppContext } from "../reducer/context";
import { Card } from "../components/Card";
import Sidebar from "../components/Sidebar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { product } from "../components/Carrousel2";

export default () => {
  const { state, dispatch } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState([0, 6]);
  const [data, setData] = useState<product[]>([]);
  const lastPage = Math.round(
    (state.search?.length ? state.search?.length : 1) / 6
  );
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setIndex([(value - 1) * 6, value * 6]);
  };
  useEffect(() => {
    setData(state.shoppingCart);
  }, []);
  return (
    <>
      <div className="search_maincontainer">
        <Sidebar />
        <div className="search_griddisplay">
          {state.filter!.length > 0
            ? state.filter?.slice(index[0], index[1]).map((p, i) => {
                return <Card key={i} item={p} showFav={true}></Card>;
              })
            : null}
        </div>
      </div>
      <Stack spacing={2}>
        <Pagination
          className="PaginationS"
          count={lastPage}
          defaultPage={page}
          showFirstButton
          showLastButton
          onChange={handleChange}
          boundaryCount={1}
          siblingCount={1}
          color="primary"
        />
      </Stack>
    </>
  );
};
