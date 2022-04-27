import React from "react";
import logo from "../assets/images/logo.png";
import "../style/loginform/loginform.css";

const LoginForm = () => {
  return (
    <div className="container">
      <div className="container__left">
        <img src={logo} alt={"kingfisher - logo"} />
      </div>
    </div>
  );
};

export default LoginForm;
