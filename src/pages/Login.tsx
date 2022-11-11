import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate, useLocation } from "react-router-dom";
import { SnackbarOrigin } from "@mui/material";
import Swal from "sweetalert2";
import { getCart } from "../services/functions";
import { AppContext } from "../reducer/context";
import { productType, Types } from "../reducer/Types";

export interface State extends SnackbarOrigin {
  open: boolean;
}

interface Props {
  close?: Function;
}
export const Login = ({ close }: Props) => {
  const { state, dispatch } = useContext(AppContext);
  const [create, setCreate] = useState<boolean>(true);
  const [data, setData] = useState({ email: "", password: "" });
  const [token, setToken] = useLocalStorage("token", "");
  const [name, setName] = useLocalStorage("name", "");
  const navigate = useNavigate();
  const location = useLocation();

  const [states, setStates] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = states;

  const handleClose = () => {
    setStates({ ...states, open: false });
  };

  const handleClick = () => {
    setStates({ open: true, vertical: "top", horizontal: "center" });
  };

  function handleChange(evt: any) {
    setData({ ...data, [evt.target.name]: evt.target.value });
  }

  function handleLogin(evt: any) {
    evt.preventDefault();
    axios
      .post("http://localhost:5000/api/users/singIn", data)
      .then(async (res) => {
        setToken(res.data.token);
        setName(res.data.user.name);
        let answer = await getCart();
        dispatch({
          type: Types.GetCart,
          payload: answer[0],
        });
        getQuantity(answer[0]);
        if (close) {
          close();
        }
        function getQuantity(data: productType[]) {
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
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/");
  }
  function handleCreation(evt: any) {
    evt.preventDefault();
    axios
      .post("http://localhost:5000/api/users/signUp", data)
      .then((res) => {
        setToken(res.data.token);
        setName(res.data.user.name);
        navigate("/");
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
    handleClick();
  }, []);

  return (
    <>
      {create ? (
        <>
          <form className="login_form" onSubmit={handleLogin}>
            <label>Username:</label>
            <input
              name="email"
              onChange={handleChange}
              type="text"
              autoComplete="on"
            />
            <br></br>
            <label>Password:</label>
            <input
              name="password"
              onChange={handleChange}
              type="password"
              autoComplete="on"
            />
            <button>Login</button>
          </form>
          <button
            onClick={() => {
              setCreate(!create);
            }}
          >
            Create your account
          </button>
        </>
      ) : (
        <>
          <form className="login_form" onSubmit={handleCreation}>
            <label>Username:</label>
            <input name="email" onChange={handleChange} type="text" />
            <label>Name:</label>
            <input name="name" onChange={handleChange} type="text" />
            <label>Password:</label>
            <input name="password" onChange={handleChange} type="password" />

            <button>Create your account</button>
          </form>
          <button
            onClick={() => {
              setCreate(!create);
            }}
          >
            I have already an account
          </button>
        </>
      )}
    </>
  );
};
