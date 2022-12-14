import React, { useState, useContext } from "react";
import * as services from "../services/functions";
import { Card } from "./Card";
import { AppContext } from "../reducer/context";
import { productType, Types, Address } from "../reducer/Types";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const AddAddress = () => {
  const { state, dispatch } = useContext(AppContext);
  const [data, setData] = useState<Address>({
    Address: "",
    City: "",
    Country: "",
    Telephone_number: "",
    ZIP_CODE: "",
  });
  const [newAddress, setNewAddress] = useState("");
  const navigate = useNavigate();
  const username = window.localStorage.getItem("name");
  const handleChangeInput = (event: any) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  async function handlePostAddres() {
    await services.postAddress(data);
    const newState = state.address;
    newState.push(data);
    dispatch({ type: Types.GetAddress, payload: newState });
    navigate(`/user/${username}/address`);
  }
  return (
    <>
      <form
        onSubmit={() => {
          services.postAddress(newAddress);
        }}
        className="AddAddress_Form"
        autoComplete="off"
      >
        <div className="login_form">
          <label className="login_label">Address:</label>
          <input
            className="login_input"
            name="Address"
            onChange={handleChangeInput}
            type="text"
            autoComplete="off"
          />
        </div>
        <div className="login_form">
          <label className="login_label">City:</label>
          <input
            className="login_input"
            name="City"
            onChange={handleChangeInput}
            autoComplete="off"
          />
        </div>
        <div className="login_form">
          <label className="login_label">Country:</label>
          <input
            className="login_input"
            name="Country"
            onChange={handleChangeInput}
            autoComplete="off"
          />
        </div>
        <div className="login_form">
          <label className="login_label">ZIP CODE:</label>
          <input
            className="login_input"
            name="ZIP_CODE"
            onChange={handleChangeInput}
            autoComplete="off"
          />
        </div>
        <div className="login_form">
          <label className="login_label">Telephone number:</label>
          <input
            className="login_input"
            name="Telephone_number"
            onChange={handleChangeInput}
            autoComplete="off"
          />
        </div>
        <div className="Address_ButtonContainer">
          <Button
            sx={{
              borderColor: "#222222",
              color: "#222222",
              height: "40px",
              minWidth: "40px",
              ":hover": { color: "blue" },
            }}
            onClick={handlePostAddres}
          >
            Create Address
          </Button>
        </div>
      </form>
    </>
  );
};
