import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import Account from "./components/touch/Account";
import Groups from "./components/touch/Groups";
import Navigation from "./components/touch/Navigation";
import Players from "./components/touch/Players";

import "./style/touch.css";

const Touch = ({ user, logoutUser, selectGroup, currentlySelectedGroup, selectedPlayer, selectPlayer }) => {

  const [hideNav, setHideNav] = useState(false);

  const hideNavBar = (bool) => setHideNav(bool)

  const scrollInto = useRef(null)
  useEffect(() => {
    scrollInto.current.scrollIntoView()
  })

  return (
    <div className="touch-container">
      <div className="touch-container__content" ref={scrollInto}>
        <Routes>
          <Route path="*" element={<Players currentlySelectedGroup={currentlySelectedGroup} user={user} selectedPlayer={selectedPlayer} selectPlayer={selectPlayer} hideNavBar={hideNavBar}/>} />
          <Route path="/m/groups" element={<Groups user={user} selectGroup={selectGroup} currentlySelectedGroup={currentlySelectedGroup}/>} />
          <Route path="/m/account" element={<Account user={user} logoutUser={logoutUser}/>} />
        </Routes>
      </div>
      {!hideNav && <Navigation />}
    </div>
  );
};

export default Touch;
