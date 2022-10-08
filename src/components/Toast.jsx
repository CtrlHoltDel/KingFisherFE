import React from "react";


import "../style/toast/toast.css"

import { MdOutlineError } from 'react-icons/md';

const Toast = ({ type, message }) => {

  const generateToast = () => {
    if(type === "error"){
        return <div className="toast-message error"><MdOutlineError /><p>{message}</p></div>
    }
  };

  return <div className="toast-container">{generateToast()}</div>;
};

export default Toast;
