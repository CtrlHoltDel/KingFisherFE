import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import "../style/loginform/loginform.css";



const LoginForm = ({ setUser }) => {

  const [loginRegisterType, setLoginRegisterType] = useState("login")
  const [credentials, setCredentials] = useState({ username: null, password: null, repeatedPassword: null})

  const toggleType = () => setLoginRegisterType(loginRegisterType === "login" ? "register" : "login")

  const handleSubmitForm = (e) => {
    e.preventDefault();

    console.log(credentials);
    if(loginRegisterType === 'login'){
      //handle login
    } else {
      //hanlde register
    }

  }

  return (
    <div className="login-container">
      <div className="login-container__left sub-container">
        <img src={logo} alt={"kingfisher - logo"} />
      </div>
      <form onSubmit={handleSubmitForm} className="login-container__right sub-container">
        <label htmlFor="">Username</label>
        <input type="text" />
        <label htmlFor="">Password</label>
        <input type="text" />
        {loginRegisterType === "register" &&  <>
        <label htmlFor="">Repeat password</label>
        <input type="text" />
        </>}
        <button>{loginRegisterType === "login" ? "Log in" : "Register"}</button>
        <p onClick={toggleType} class="register-login-toggle">{loginRegisterType === "login" ? "Don't have an account? Register" : "Already have an account? Log in."}</p>
      </form>
    </div>
  );
};

export default LoginForm;
