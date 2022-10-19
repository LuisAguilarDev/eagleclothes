import axios from "axios";
import React from "react";
import { useLocalStorage } from "./../hooks/useLocalStorage";

const Login = () => {
  const [value, setValue] = useLocalStorage("token", "");
  function handleLogin(data: any) {
    axios
      .post("http://localhost:5000/api/users/", data)
      .then(function (response) {
        alert(response.data.message);
        setValue(response.data.token);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type="text" />
        <input type="text" />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};
