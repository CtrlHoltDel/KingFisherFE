import React, { useState } from "react";
import { register } from "../api/actions";
import logo from "../assets/images/logo.png";
import "../style/loginform/loginform.css";



const LoginForm = ({ setUser }) => {

  const [loginRegisterType, setLoginRegisterType] = useState("login")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState("");


  const toggleType = () => setLoginRegisterType(loginRegisterType === "login" ? "register" : "login")

  const handleSubmitForm = async (e) => {
    e.preventDefault();


    if(loginRegisterType === 'login'){
      // setUser({username: "test", password: "test"})
      //handle login
    } else {
      // setLoginRegisterType("login")
      //handle register
      const response = await register(username, password)

      console.log(response)
    }
  }

  

  return (
    <div className="login-container">
      <div className="login-container__left sub-container">
        <img src={logo} alt={"kingfisher - logo"} />
      </div>
      <form onSubmit={handleSubmitForm} className="login-container__right sub-container">
        <label htmlFor="">Username</label>
        <input type="text" value={username} onChange={(e) => {
          setUsername(e.target.value)
        }}/>
        <label htmlFor="">Password</label>
        <input type="text" value={password} onChange={(e) => {
          setPassword(e.target.value)
        }}/>
        {loginRegisterType === "register" &&  <>
        <label htmlFor="">Repeat password</label>
        <input type="text" value={validatePassword} onChange={(e) => {
          setValidatePassword(e.target.value)
        }}/>
        </>}
        <button>{loginRegisterType === "login" ? "Log in" : "Register"}</button>
        <p onClick={toggleType} className="register-login-toggle">{loginRegisterType === "login" ? "Don't have an account? Register" : "Already have an account? Log in."}</p>
      </form>
    </div>
  );
};

export default LoginForm;
