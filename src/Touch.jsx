import React from "react";

import { Routes, Route } from "react-router-dom";

import Account from "./components/touch/Account";
import Groups from "./components/touch/Groups";
import Navigation from "./components/touch/Navigation";
import Players from "./components/touch/Players";

import "./style/touch.css";

const Touch = ({ user, logoutUser, selectGroup, currentlySelectedGroup }) => {
  return (
    <div className="touch-container">
      <div className="touch-container__content">
        <Routes>
          <Route path="*" element={<Players currentlySelectedGroup={currentlySelectedGroup}/>} />
          <Route path="/m/groups" element={<Groups user={user} selectGroup={selectGroup} currentlySelectedGroup={currentlySelectedGroup}/>} />
          <Route path="/m/account" element={<Account user={user} logoutUser={logoutUser}/>} />
        </Routes>
      </div>
      <Navigation />
    </div>
  );
};

export default Touch;
