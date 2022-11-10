import React, { useContext } from "react";
import { useState } from "react";
import { AppContext } from "../reducer/context";
import { Item } from "../components/Carrousel1";
import Sidebar from "../components/Sidebar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default () => {
  const { state, dispatch } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState([0, 6]);
  const lastPage = Math.round(
    (state.search?.length ? state.search?.length : 1) / 6
  );
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setIndex([(value - 1) * 6, value * 6]);
  };

  return (
    <>
      <div className="search_maincontainer">
        <Sidebar />
        <div className="search_griddisplay">
          {state.search?.slice(index[0], index[1]).map((p, i) => {
            return <Item key={i} item={p}></Item>;
          })}
        </div>
      </div>
      <Stack spacing={2}>
        <Pagination
          className="Pagination"
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
