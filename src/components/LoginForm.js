import React, { useContext, useState } from "react";
import axios from "axios";

import "../styles/Forms.css";

import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const { token, login, logout } = useContext(AuthContext);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const userData = {
    name: username,
    password: password,
  };

  const handlerLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/users/login", userData, {
        withCredentials: true,
      })
      .then((res) => {
        const { data } = res;

        login(data);
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  return (
    <div>
      <form className="loginForm" onSubmit={handlerLogin}>
        <p>User Name</p>
        <input onChange={(e) => setUserName(e.target.value)}></input>
        <p>Password</p>
        <input onChange={(e) => setPassword(e.target.value)}></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
