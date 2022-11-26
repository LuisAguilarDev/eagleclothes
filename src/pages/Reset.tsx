import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { productType, Types } from "../reducer/Types";
import { addToCart } from "../services/functions";
import { AppContext } from "../reducer/context";
import * as services from "../services/functions";
import { Button } from "@mui/material";

export default () => {
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage("token", "");
  const [name, setName] = useLocalStorage("name", "");
  const [cart, setCart, getCart] = useLocalStorage("cart", []);
  const { state, dispatch } = useContext(AppContext);

  const search: any = useLocation().search;
  const token2 = new URLSearchParams(search).get("token");
  const Authorization = token2 ? "Bearer " + token2 : "";

  function validateEmail(evt: any) {
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        evt.target.value
      )
    ) {
      if (evt.target.name === "email") {
        setPassword(evt.target.value);
        setError("");
        return setTimeout(validateSame("", error2), 500);
      }
      if (evt.target.name === "email2") {
        setPassword(evt.target.value);
        setError2("");
        return setTimeout(validateSame(error, ""), 500);
      }

      return;
    }
    if (evt.target.name === "email") {
      setError(
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:"
      );
    }
    if (evt.target.name === "email2") {
      setError2(
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:"
      );
    }
  }

  function validateSame(err1: string, err2: string) {
    if (err1 === "" && err2 === "") {
      setError3("");
      return "error";
    }
    if (err1 !== "" || err2 !== "") {
      setError3("Passwords does not match");
      return "error";
    }

    return "error";
  }

  async function hanldeSubmit(e: any, password: string) {
    e.preventDefault();
    if (error) return;
    const answer = await axios
      .post(
        `https://eagleclothes-backend-production.up.railway.app/api/users/change/${password}`,
        password,
        {
          headers: { Authorization },
        }
      )
      .then((res) => {
        setToken(token2);
        setName(res.data.userBase.name);
      });

    if (cart.length > 0) {
      cart.forEach((item: productType) => {
        addToCart(e, [item]);
      });
    }
    dispatch({
      type: Types.Loading,
      payload: !state.loading,
    });
    setTimeout(async function delayed() {
      let dataCart = await services.getCart();
      setCart(dataCart[0]);
      function getQuantity(data: productType[]) {
        if (data.length === 0) return;
        const quantityArray = data.map((item, i) => {
          if (!item.quantity) return 0;
          return item.quantity;
        });
        let total = quantityArray.reduce((a, b) => a + b, 0);
        total = total ? total : 0;
        dispatch({
          type: Types.SetQuantity,
          payload: total,
        });
        const getaddress = async () => {
          const answer = await services.GetAddress();
          dispatch({ type: Types.GetAddress, payload: answer });
        };
        getaddress();
      }
      getQuantity(dataCart[0] ? dataCart[0] : []);
    }, 400);
    navigate("/");
  }

  return (
    <>
      <div className="login_form">
        <div className="login_label">New password:</div>
        <input
          autoComplete="new-password"
          className="login_input"
          name="email"
          onChange={validateEmail}
          placeholder="New Password"
          type="password"
        />
      </div>
      {error ? <div className="login_error">{error}</div> : null}
      <div className="login_form">
        <div className="login_label">Re-enter:</div>
        <input
          autoComplete="new-password"
          className="login_input"
          name="email2"
          onChange={validateEmail}
          type="password"
          placeholder="Confirm New Password"
        />
      </div>
      {error2 ? <div className="login_error">{error2}</div> : null}
      {error3 ? <div className="login_error">{error3}</div> : null}
      <div className="login_form">
        <Button
          sx={{
            borderColor: "#222222",
            color: "#222222",
            height: "40px",
            padding: "12px",
            margin: "12px",
            width: "210px",
            ":hover": { color: "blue" },
          }}
          variant="outlined"
          onClick={(e) => hanldeSubmit(e, password)}
        >
          Continue
        </Button>
      </div>
    </>
  );
};
