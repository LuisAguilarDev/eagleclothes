import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { AppContext } from "../reducer/context";
import { productType, Types } from "../reducer/Types";
import { getCart } from "../services/functions";
import Swal from "sweetalert2";

export const Validate: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const tokenParams = searchParams.get("token");
  const [token, setToken] = useLocalStorage("token", "");
  const [name, setName] = useLocalStorage("name", "");
  const navigate = useNavigate();
  async function validateUser(tokenToValidate: string) {
    const answer = await axios
      .get(
        `https://eagleclothes-backend-production.up.railway.app/api/users/validateUser/${tokenToValidate}`
      )
      .then(async (res) => {
        setToken(res.data.token);
        setName(res.data.answer.name);
        let answer = await getCart();
        dispatch({
          type: Types.GetCart,
          payload: answer,
        });
        function getQuantity(data: productType[]) {
          if (data.length === 0) return;
          const answer = data.map((item, i) => {
            if (!item.quantity) return 0;
            return item.quantity;
          });
          let total = answer.reduce((a, b) => a + b, 0);
          total = total ? total : 0;
          dispatch({
            type: Types.SetQuantity,
            payload: total,
          });
        }
        getQuantity(answer);
        return true;
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.status === 403) {
          Swal.fire({
            title: err.response.data.message,
            icon: "error",
            confirmButtonColor: "#9ea03b",
          });
          return err?.response?.status;
        }
        return false;
      });
    await answer;
    if (answer === true) {
      navigate("/");
    }
  }

  useEffect(() => {
    if (tokenParams !== null) {
      validateUser(tokenParams);
    }
  });
  return (
    <div className="Validate_Container">
      {name !== "" ? <Link to="/"></Link> : <div>Invalid Request</div>}
    </div>
  );
};

export default Validate;
