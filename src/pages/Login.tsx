import React from "react";
import Navigation from "./../components/Navigation";
import { useState } from "react";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export default () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [token, setToken] = useLocalStorage("token", "");
  const [name, setName] = useLocalStorage("name", "");
  const navigate = useNavigate();
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
  return (
    <>
      <Navigation />
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
