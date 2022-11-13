import { AppContext } from "../reducer/context";
import { productType, Types } from "../reducer/Types";
import React, { useContext, useEffect, useState } from "react";
import { getFormHelperTextUtilityClasses } from "@mui/material";

export const Sidebar: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [prices, setPrices] = useState<number[]>([]);
  function getPrices() {
    if (state.search && state.search.length > 0) {
      const pricesD = state.search.map((p) => {
        return p.price.value;
      });
      function removeDuplicates(arr: number[]) {
        return [...new Set(arr)];
      }
      const noDuplicates = removeDuplicates(pricesD);
      const sorted = noDuplicates.sort((a, b) => a - b);
      setPrices(sorted);
    }
  }

  function handleClick(p: number) {
    dispatch({
      type: Types.FilterPrice,
      payload: p,
    });
  }

  useEffect(() => {
    getPrices();
  }, [state.loading]);
  return (
    <div className="Sidebar_Container">
      <div>Filter</div>
      <div>By Price</div>
      {prices.map((p, i) => {
        return (
          <div key={i} onClick={() => handleClick(p)}>
            {p}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
