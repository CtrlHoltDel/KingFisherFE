import React from "react";
import { useState } from "react";

import { BiChevronsLeft, BiChevronsRight, BiLogOutCircle } from "react-icons/bi";
import { GrGroup } from 'react-icons/gr'

const Navigation = ({ logoutUser, toggleGroupsMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNav = () => setIsOpen((curr) => !curr);

  return (
    <div className="navigation">
      {isOpen ? (
        <div className="layout-open">
          <div className="menu">
            <button onClick={toggleNav}>
              <BiChevronsLeft />
              <p>close</p>
            </button>
            <button onClick={toggleGroupsMenu}>
              <GrGroup />
              <p>groups</p>
            </button>
          </div>
          <div className="user">
            <button onClick={logoutUser}>
              <BiLogOutCircle />
              <p>Logout</p>
            </button>
          </div>
        </div>
      ) : (
        <div className="layout-closed">
          <div className="menu">
            <button onClick={toggleNav}>
              <BiChevronsRight />
            </button>
            <button onClick={toggleGroupsMenu}>
              <GrGroup />
            </button>
          </div>
          <div className="user">
            <button onClick={logoutUser}>
              <BiLogOutCircle />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
