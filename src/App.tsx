import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Userpanel from "./pages/Userpanel";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user/:name" element={<Userpanel />} />
    </Routes>
  );
}

export default App;
