import React, { useState, useContext, useEffect } from "react";
import * as services from "../services/functions";
import { AppContext } from "../reducer/context";
import { Types } from "../reducer/Types";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";

export const Address = () => {
  const { state, dispatch } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState([0, 6]);
  const [newAddress, setNewAddress] = useState("");
  const navigate = useNavigate();
  const username2 = window.localStorage.getItem("name");
  const username = username2
    ? username2.substring(1, username2.length - 1)
    : "";
  const lastPage = Math.round(
    (state.address?.length ? state.address?.length : 1) / 6
  );
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setIndex([(value - 1) * 6, value * 6]);
  };

  const handleDelete = async (index: number) => {
    const answer = await services.deleteAddress(index);
    dispatch({ type: Types.GetAddress, payload: answer.actual.address });
  };
  useEffect(() => {
    const getaddress = async () => {
      const answer = await services.GetAddress();
      dispatch({ type: Types.GetAddress, payload: answer });
    };
    getaddress();
  }, []);

  function handleChangeAddress(e: any) {
    setNewAddress(e.target.value);
  }

  return (
    <>
      <div className="Address_mainContainer">
        <div
          onClick={() => {
            navigate(`/user/${username}/addAddress`);
          }}
          className="Address_containerAdd"
        >
          <AddIcon sx={{ width: "100px" }}></AddIcon>
          <div>Add Address</div>
        </div>
        {state.address!.length > 0 ? (
          state.address!.map((address, i) => {
            return (
              <div className="Address_container" key={i}>
                <div className="Address_textContainer">
                  <div className="Address_label">
                    Address : {address.Address}
                  </div>
                  <div className="Address_label">City : {address.City}</div>
                  <div className="Address_label">
                    Country : {address.Country}
                  </div>
                  <div className="Address_label">
                    Telephone number : {address.Telephone_number}
                  </div>
                  <div className="Address_label">
                    ZIP CODE : {address.ZIP_CODE}
                  </div>
                </div>
                <div className="Address_IconContainer">
                  <DeleteOutlineIcon
                    onClick={() => handleDelete(i)}
                    className="Address_delete"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="Empty_Message">
            You don't have registered address, please add your main address.
          </h1>
        )}
      </div>
    </>
  );
};
