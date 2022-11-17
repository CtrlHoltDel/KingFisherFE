import React from "react";
import { useState } from "react";

import {
  BiChevronsLeft,
  BiChevronsRight,
  BiLogOutCircle,
} from "react-icons/bi";
import { GrGroup, GrUserAdmin } from "react-icons/gr";
import { CiSettings } from "react-icons/ci";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Navigation = ({ toggleGroupsMenu, toggleSettingsMenu, toggleAdminMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNav = () => setIsOpen((curr) => !curr);

  const { logoutUser, user } = useContext(UserContext);

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
            {user.sysadmin && (
              <button onClick={toggleAdminMenu}>
                <GrUserAdmin />
                <p>Admin</p>
              </button>
            )}
            <button onClick={toggleSettingsMenu}>
              <CiSettings />
              <p>Settings</p>
            </button>
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
            {user.sysadmin && (
              <button onClick={toggleAdminMenu}>
                <GrUserAdmin />
              </button>
            )}
            <button onClick={toggleSettingsMenu}>
              <CiSettings />
            </button>
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
