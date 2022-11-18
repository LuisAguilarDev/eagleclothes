import { AppContext } from "../reducer/context";
import { productType, Types } from "../reducer/Types";
import React, { useContext, useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export const Sidebar: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [prices, setPrices] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<number>(0);
  const [categorieFilter, setCategorieFilter] = useState<string>("");

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
  function filterData() {}

  function getCategories() {
    if (state.search && state.search.length > 0) {
      const categoriesD = state.search.map((p) => {
        return p.category;
      });
      function removeDuplicates(arr: string[]) {
        return [...new Set(arr)];
      }
      const noDuplicates = removeDuplicates(categoriesD);
      setCategories(noDuplicates);
    }
  }

  function handleClick(p: number | string) {
    if (priceFilter === 0 && categorieFilter === "") {
      if (typeof p === "number") {
        setPriceFilter(p);
        dispatch({
          type: Types.FilterPrice,
          payload: p,
        });
      }
      if (typeof p === "string") {
        setCategorieFilter(p);
        dispatch({
          type: Types.FilterCategory,
          payload: p,
        });
      }
    }
    if (typeof p === "number" && categorieFilter === "") {
      setPriceFilter(p);
      dispatch({
        type: Types.FilterPrice,
        payload: p,
      });
    }
    if (typeof p === "string" && priceFilter === 0) {
      setCategorieFilter(p);
      dispatch({
        type: Types.FilterCategory,
        payload: p,
      });
    }
    if (typeof p === "string" && priceFilter) {
      const newDataF1 = state.search
        ? state.search.filter(
            (product: productType) => product.price.value === priceFilter
          )
        : [];
      const newDataF2 = newDataF1
        ? newDataF1.filter((product: productType) => product.category === p)
        : [];
      dispatch({
        type: Types.FilteredData,
        payload: newDataF2,
      });
    }
    if (typeof p === "number" && categorieFilter) {
      const newDataF1 = state.search
        ? state.search.filter(
            (product: productType) => product.price.value === p
          )
        : [];
      const newDataF2 = newDataF1
        ? newDataF1.filter(
            (product: productType) => product.category === categorieFilter
          )
        : [];
      dispatch({
        type: Types.FilteredData,
        payload: newDataF2,
      });
    }
  }

  useEffect(() => {
    getPrices();
    getCategories();
    return () => {
      setPriceFilter(0);
      setCategorieFilter("");
    };
  }, [state.loading]);
  return (
    <div className="Sidebar_Container">
      <div className="Sidebar_MainTitle">Filter</div>
      <div className="Sidebar_SecondaryTitle">By Price</div>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        className={"Sidebar_ContainerOptions"}
      >
        {prices.map((p, i) => {
          return (
            <FormControlLabel
              value={p}
              control={<Radio />}
              label={p}
              key={i}
              onClick={() => handleClick(p)}
            />
          );
        })}
      </RadioGroup>
      <div className="Sidebar_SecondaryTitle">By Category</div>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        className={"Sidebar_ContainerOptions"}
      >
        {categories.map((p, i) => {
          return (
            <FormControlLabel
              value={p}
              control={<Radio />}
              label={p}
              key={i}
              onClick={() => handleClick(p)}
            />
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default Sidebar;
