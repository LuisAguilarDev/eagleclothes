import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { SnackbarOrigin } from "@mui/material";
import Swal from "sweetalert2";
import { getCart, addToCart } from "../services/functions";
import { AppContext } from "../reducer/context";
import { productType, Types } from "../reducer/Types";
import { Button } from "@mui/material";
import * as services from "../services/functions";

export interface State extends SnackbarOrigin {
  open: boolean;
}

interface Props {
  close?: Function;
}
export const Login = ({ close }: Props) => {
  const { state, dispatch } = useContext(AppContext);
  const [cart, setCart, getCartLocal] = useLocalStorage("cart", []);
  const [create, setCreate] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorP, setErrorP] = useState<boolean>(false);
  const [data, setData] = useState({ email: "", password: "", name: "" });
  const [token, setToken] = useLocalStorage("token", "");
  const [name, setName] = useLocalStorage("name", "");
  const navigate = useNavigate();
  const location = useLocation();

  function handleChange(evt: any) {
    setData({ ...data, [evt.target.name]: evt.target.value });
    validateEmail(evt);
  }

  async function handleLogin(evt: any) {
    evt.preventDefault();
    if (error) {
      return;
    }
    const answer = await axios
      .post(
        "https://eagleclothes-backend-production.up.railway.app/api/users/singIn",
        data
      )
      .then(async (res) => {
        if (res.data.message === "permision denied") {
          Swal.fire({
            title: "WRONG USERNAME OR PASSWORD",
            icon: "error",
            confirmButtonColor: "#9ea03b",
          });
          return;
        }
        setToken(res.data.token);
        setName(res.data.user.name);
        if (cart.length > 0) {
          cart.forEach((item: productType) => {
            addToCart(evt, [item]);
          });
        }
        if (close) {
          close();
        }

        return true;
      })
      .catch((err) => {
        console.log(err, "error?");
        return false;
      });

    setTimeout(async function delayed() {
      let dataCart = await getCart();
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
  }

  function validateEmail(evt: any) {
    if (evt.target.name === "email") {
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(evt.target.value)
      ) {
        setError(false);
        return;
      }
      setError(true);
    }
  }

  function handleCreation(evt: any) {
    if (error) {
      return;
    }
    if (data.name === "") {
      Swal.fire({
        title: "Please insert your name",
        icon: "info",
        confirmButtonColor: "#9ea03b",
      });
      return;
    }
    if (data.name.length < 6) {
      Swal.fire({
        title: "Your name must have at least 6 characters",
        icon: "info",
        confirmButtonColor: "#9ea03b",
      });
      return;
    }
    axios
      .post(
        "https://eagleclothes-backend-production.up.railway.app/api/users/signUp",
        data
      )
      .then((res) => {
        if (
          res.data.message === "el usuario ya se encuentra creado en el sistema"
        ) {
          Swal.fire({
            title: "User is already registered please login",
            icon: "info",
            confirmButtonColor: "#9ea03b",
          });
          return;
        }
        if (!res.data.user.verified) {
          Swal.fire({
            title: res.data.message,
            icon: "info",
            confirmButtonColor: "#9ea03b",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAlert() {
    if (location.state?.message) {
      Swal.fire({
        title: location.state?.message,
        icon: "success",
        confirmButtonColor: "#9ea03b",
      });
    }
    return;
  }

  useEffect(() => {
    handleAlert();
  }, []);

  return (
    <>
      {create ? (
        <>
          <form onSubmit={handleLogin}>
            <div className="login_form">
              <label className="login_label">Username:</label>
              <input
                className="login_input"
                name="email"
                onChange={handleChange}
                type="text"
              />
            </div>
            {error === true ? (
              <div className="login_error">Username must be an email</div>
            ) : null}
            <div className="login_form">
              <label className="login_label">Password:</label>
              <input
                className="login_input"
                name="password"
                onChange={handleChange}
                type="password"
              />
            </div>
            <div className="login_formForgot">
              <Link to="/forgotPassword">
                <div className="login_forgot">Forgot your password?</div>
              </Link>
            </div>
            <div className="login_buttonContainer">
              <Button
                sx={{
                  borderColor: "#222222",
                  color: "#222222",
                  height: "40px",
                  padding: "12px",
                  margin: "12px",
                  marginTop: "0px",
                  width: "210px",
                  ":hover": { color: "blue" },
                }}
                variant="outlined"
                onClick={(e) => {
                  handleLogin(e);
                }}
              >
                Login
              </Button>
            </div>
            <div className="login_buttonContainer">
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
                onClick={() => {
                  setCreate(!create);
                }}
              >
                Create your account
              </Button>
            </div>
          </form>
        </>
      ) : (
        <>
          <form onSubmit={handleCreation}>
            <div className="login_form">
              <label className="login_label">Username:</label>
              <input
                className="login_input"
                name="email"
                onChange={handleChange}
                type="text"
              />
            </div>
            {error === true ? (
              <div className="login_error">Username must be an email</div>
            ) : null}
            <div className="login_form">
              <label className="login_label">Password:</label>
              <input
                className="login_input"
                name="password"
                onChange={handleChange}
                type="password"
              />
            </div>
            <div className="login_form">
              <label className="login_label">Name:</label>
              <input
                className="login_input"
                name="name"
                onChange={handleChange}
                type="text"
              />
            </div>

            <div className="login_buttonContainer">
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
                onClick={() => {
                  handleCreation(data);
                }}
              >
                Create your account
              </Button>
            </div>
          </form>
          <div className="login_buttonContainer">
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
              onClick={() => {
                setCreate(!create);
              }}
            >
              I have an account!
            </Button>
          </div>
        </>
      )}
    </>
  );
};
