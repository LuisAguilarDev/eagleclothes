import React, { useState, useContext } from "react";
import * as services from "../services/functions";
import { Card } from "./Card";
import { AppContext } from "../reducer/context";
import { Types } from "../reducer/Types";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export const Favorites = () => {
  const { state, dispatch } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState([0, 6]);
  const lastPage = Math.round(
    (state.favorites?.length ? state.favorites?.length : 1) / 6
  );
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setIndex([(value - 1) * 6, value * 6]);
  };
  useState(async () => {
    const answer = await services.getFav();
    if (!answer.answer) {
      return dispatch({ type: Types.GetFavs, payload: [] });
    }
    dispatch({ type: Types.GetFavs, payload: answer.answer });
  });
  return (
    <>
      <div className="Favs_mainContainer">
        {state.favorites!.length > 0 ? (
          state.favorites!.slice(index[0], index[1]).map((item, i) => {
            return <Card key={i} item={item} showFav={false} showDel={true} />;
          })
        ) : (
          <h1 className="Empty_Message">
            You don't have favorites yet, go and find something you love.
          </h1>
        )}
      </div>
      <br></br>
      <div className="PaginationF">
        <Stack spacing={2}>
          <Pagination
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
      </div>
    </>
  );
};
