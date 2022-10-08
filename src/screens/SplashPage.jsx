import { current } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { register } from "../api/actions";
import logo from "../assets/images/logo.png";
import "../style/splashpage/splash-page.css";



const LoginForm = ({ setUser }) => {

  const [loginRegisterType, setLoginRegisterType] = useState("login")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState("");

  const [inputs, setInputs] = useState({ username: "", password: "", validatePassword: "" })
  const [invalidData, setInvalidData] = useState(true)
  const [error, setError] = useState("");


  const toggleType = () => setLoginRegisterType(loginRegisterType === "login" ? "register" : "login")

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if(loginRegisterType === 'login'){
      // setUser({username: "test", password: "test"})
      //handle login
    } else {
      // setLoginRegisterType("login")
      //handle register
      const { user, error } = await register(username, password)

      if(error) 

      console.log(error)
    }
  }

  const checkFormValidity = (currentInput) => {

    console.log("test");
    const { username, password, validatePassword } = currentInput;


    if(loginRegisterType === "login"){
      setInvalidData(!username || !password) 
    } else {
      setInvalidData(!username || !password || !validatePassword) 
    }
  }

  

  return (
    <div className="login-container">
      <div className="login-container__left sub-container">
        <img src={logo} alt={"kingfisher - logo"} />
      </div>
      <form onSubmit={handleSubmitForm} className="login-container__right sub-container">
        <label htmlFor="">Username</label>
        <input type="text" name="username" value={inputs.username} onChange={(e) => {

        }}/>
        <label htmlFor="">Password</label>
        <input type="text" name="password" onChange={(e) => {

        }}/>
        {loginRegisterType === "register" &&  <>
        <label htmlFor="">Repeat password</label>
        <input type="text" name="validatePassword" value={inputs.validatePassword} onChange={(e) => {
          console.log(e)
          setInputs(currInput => {
            const updatedInput =  { ...currInput, validatePassword: e.target.value };
            checkFormValidity(updatedInput);
            return updatedInput;
          })
        }}/>
        </>}
        <button disabled={invalidData}>{loginRegisterType === "login" ? "Log in" : "Register"}</button>
        <p onClick={toggleType} className="register-login-toggle">{loginRegisterType === "login" ? "Don't have an account? Register" : "Already have an account? Log in."}</p>
      </form>
    </div>
  );
};

export default LoginForm;
