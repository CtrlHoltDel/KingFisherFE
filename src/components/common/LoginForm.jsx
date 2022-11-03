import { useState } from "react";
import { APIHandleLogin, APIHandleRegister } from "../../api/actions";
import logo from "../../assets/logo.png";

import loadingIcon from '../../assets/loading.svg'

const LOGIN = "login";
const REGISTER = "register";

const LoginForm = ({ handleSetUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const [toastMessage, setToastMessage] = useState('')

  const [authType, setAuthType] = useState(LOGIN);
  const toggleAuthType = () =>
    setAuthType((curr) => (curr === LOGIN ? REGISTER : LOGIN));

  const login = async () => {
    setLoading(true);
    const { error, user } = await APIHandleLogin(username, password);
    if (error) {
      setToastMessage(error);
    } else {
      handleSetUser(user);
    }
    setLoading(false);
  };

  const register = async () => {
    if (password !== passwordConfirmation) {
      setToastMessage("Passwords do not match");
      return
    }

    setLoading(true);
    const { error } = await APIHandleRegister(username, password);
    if (error) {
      setToastMessage(error);
    } else {
      setUsername('')
      setPassword('')
      setPasswordConfirmation('')
      setAuthType(REGISTER)
      setToastMessage('Account created.')
    }
    setLoading(false);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    if (authType === LOGIN) await login();
    if (authType === REGISTER) await register();
  };

  const handleDisabledAuth = () => {
    if (authType === LOGIN) return !(username && password);
    if (authType === REGISTER)
      return !(username && password && passwordConfirmation);
  };

  return (
    <div className="auth-container">
      <div className="auth-inner">
        {loading && <img alt="loading-icon" class="loading-icon" src={loadingIcon}></img>}
        <img src={logo} alt="logo"></img>
        <form onSubmit={handleSubmitForm}>
          <div className="input-container">
            <p className="input-container__label">Username</p>
            <input
              value={username}
              disabled={loading}
              onChange={(e) => {
                setUsername(e.target.value);
                setToastMessage("");
              }}
            ></input>
          </div>
          <div className="input-container">
            <p className="input-container__label">Password</p>
            <input
              value={password}
              disabled={loading}
              onChange={(e) => {
                setPassword(e.target.value);
                setToastMessage("");
              }}
            ></input>
          </div>
          {authType === REGISTER && (
            <div className="input-container">
              <p className="input-container__label">Confirm Password</p>
              <input
                value={passwordConfirmation}
                disabled={loading}
                onChange={(e) => {
                  setPasswordConfirmation(e.target.value);
                  setToastMessage("");
                }}
              />
            </div>
          )}
          <button disabled={handleDisabledAuth()}>
            {authType === LOGIN ? "Log In" : "Register"}
          </button>
        </form>
        <button disabled={loading} className='toggle-auth-type' onClick={toggleAuthType}>
          {authType === LOGIN
            ? "Need an account? Click here to register"
            : "Already have an account? Log in here"}
        </button>
      </div>
      {toastMessage && <div className="toast">
        <p>{toastMessage}</p>
      </div>}
    </div>
  );
};

export default LoginForm;
