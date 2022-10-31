import React from "react";
import Navigation from "./../components/Navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate, useLocation } from "react-router-dom";
import { Alert, Snackbar, SnackbarOrigin } from "@mui/material";
import { SlideProps } from "@mui/material/Slide";

export interface State extends SnackbarOrigin {
  open: boolean;
}

export default () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [token, setToken] = useLocalStorage("token", "");
  const [name, setName] = useLocalStorage("name", "");
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handleClick = () => {
    setState({ open: true, vertical: "top", horizontal: "center" });
  };
  function handleChange(evt: any) {
    setData({ ...data, [evt.target.name]: evt.target.value });
  }
  function handleLogin(evt: any) {
    evt.preventDefault();
    console.log(data);
    axios
      .post("http://localhost:5000/api/users/singIn", data)
      .then((res) => {
        console.log(res.data);
        setToken(res.data.token);
        setName(res.data.user.name);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    handleClick();
  }, []);
  return (
    <>
      <Navigation />
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
        key={vertical + horizontal}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity="info">{location.state?.message}!</Alert>
      </Snackbar>

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
    </>
  );
};
