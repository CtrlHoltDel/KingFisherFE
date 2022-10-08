import React, { useEffect, useState } from "react";
import { DAC } from "../api/DataAccess";
import logo from "../assets/images/logo.png";
import loadingSVG from "../assets/images/loading.svg"
import Toast from "../components/Toast";
import "../style/splashpage/splash-page.css";
import { LS } from "../localStorage/local-storage";

const TLD = process.env.REACT_APP_TLD;


const LoginForm = ({ setUser }) => {

  const [loginRegisterType, setLoginRegisterType] = useState("login")

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordValidation, setPasswordValidation] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const toggleType = () => { 
    setLoginRegisterType(loginRegisterType === "login" ? "register" : "login")
    setError(null)
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setError(null)
    setLoading(true)
    if(loginRegisterType === 'login') await handleLogin()
    if(loginRegisterType === 'register') await handleRegister()
  }

  const handleLogin = async () => {
    const { response, error } = await DAC.login(username, password)
    if(error) return handleError("Invalid Login Details")
    if(!response.validated) return handleError("Account is not activated. Contact the owner for access.")
    console.log(response)
    LS.setUser(response)
    setUser(response)
  }

  const handleRegister = async () => {
    if(password !== passwordValidation) return handleError("Passwords do not match")
    const { error } = await DAC.register(username, password)
    if(error) return handleError(error.message)

    setPassword("")
    setPasswordValidation("")
    setLoginRegisterType("login")
    setLoading(false)
  }

  const handleError = (message) => {
    setError(message)
    setLoading(false)
  }

  return (
    <div className="login-container">
      <div className="login-container__image sub-container">
        <img src={logo} alt="kingfisher - logo" />
      </div>
      <form onSubmit={handleSubmitForm} className="login-container__inputs sub-container">
        <label htmlFor="">Username</label>
        <input type="text" name="username" placeholder="Username" disabled={loading} value={username} onChange={(e) => {
          setUsername(e.target.value)
        }}/>
        <label htmlFor="">Password</label>
        <input type="password" name="password" placeholder="Password" value={password} disabled={loading} onChange={(e) => {
          setPassword(e.target.value)
        }}/>
        {loginRegisterType === "register" &&  <>
        <label htmlFor="">Confirm Password</label>
        <input type="password" name="validatePassword" placeholder="Confirm Password" disabled={loading} value={passwordValidation} onChange={(e) => {
          setPasswordValidation(e.target.value)
        }}/>
        </>}
        <button disabled={loading}>{loginRegisterType === "login" ? "Log in" : "Register"}</button>
        <p onClick={toggleType} className="register-login-toggle">{loginRegisterType === "login" ? "Don't have an account? Register" : "Already have an account? Log in."}</p>
      </form>
      {loading && 
        <div className="loading-icon-container">
          <img src={loadingSVG} alt="loading-icon"></img>
        </div>
      }
      {error && <Toast type="error" message={error}/>}
    </div>
  );
};

export default LoginForm;
